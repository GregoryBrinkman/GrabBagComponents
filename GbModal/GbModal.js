const currentDocument = document.currentScript.ownerDocument;



class GbModal extends HTMLElement {
  constructor() {
    super()
    //var shadowRoot = this.attachShadow({ mode: 'open' })
    //shadowRoot.innerHTML = `<h2>hello world!</h2>`
    // Setup a click listener on <user-card>
    this.addEventListener('click', e => {
      this.toggleModal();
    });
  }  

  static get observedAttributes() {return ['open']; }


  render = (isOpen, title, body) => {

    console.log('modal!')
    
    if(!!isOpen) {
      console.log('modal! OPEN!')

      // Fill the respective areas of the card using DOM manipulation APIs
      // All of our components elements reside under shadow dom. So we created a this.shadowRoot property
      // We use this property to call selectors so that the DOM is searched only under this subtree
      this.shadowRoot.querySelector('.modal__gb-modal-title').innerHTML = title;
      this.shadowRoot.querySelector('.modal__gb-modal-body').innerHTML = body;
      //this.shadowRoot.querySelector('.card__user-name').innerHTML = userData.username;
    //this.shadowRoot.querySelector('.card__website').innerHTML = userData.website;
    //this.shadowRoot.querySelector('.card__address').innerHTML = `<h4>Address</h4>
    //  ${userData.address.suite}, <br />
    //  ${userData.address.street},<br />
    //  ${userData.address.city},<br />
    //  Zipcode: ${userData.address.zipcode}`
  }
  }

  // Called when element is inserted in DOM
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Select the template and clone it. Finally attach the cloned node to the shadowDOM's root.
    // Current document needs to be defined to get DOM access to imported HTML
    const template = currentDocument.querySelector('#gb-modal-template');
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);

    // Extract the attribute user-id from our element. 
    // Note that we are going to specify our cards like: 
    // <user-card user-id="1"></user-card>
    const isOpen = this.getAttribute('open');
    const title = this.getAttribute('title');
    const body = this.getAttribute('body');

    console.log(`modal is open? ${isOpen}`)
    console.log(title)
    console.log(body)

    this.render(isOpen, title, body)

  }

  toggleModal() {
    console.log(this)
    console.log(!this.getAttribute('open'))
    this.setAttribute('open', !this.getAttribute('open'))
  }




  disconnectedCallback() {
    console.log("element has been removed")
    this.remove()
  }

  attributeChangedCallback(name, oldval, newval) {
    console.log(`the ${name} attribute has changed from ${oldval} to ${newval}!!`);
    // do something every time the attribute changes

    const isOpen = this.getAttribute('open');
    const title = this.getAttribute('title');
    const body = this.getAttribute('body');

    console.log(`modal is open? ${isOpen}`)
    console.log(title)
    console.log(body)

    this.render(isOpen, title, body)
  }


}

customElements.define('gb-modal', GbModal)
