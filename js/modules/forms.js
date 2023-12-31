
import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {

   const forms = document.querySelectorAll(formSelector);
  
   const msg = {
     loading: 'img/form/spinner.svg',
     success: 'Thank you, will call you soon',
     failure: 'Smthg went wrong'
   };
 
   forms.forEach(item => {
     bindPostData(item);
   });
 
   
 
   function bindPostData(form) {
     form.addEventListener('submit', (e) => {
       e.preventDefault();
 
       let statusMsg = document.createElement('img');
       statusMsg.src = msg.loading;
       statusMsg.style.cssText = `
       display: block;
       margin: 0 auto;
       `;
       form.insertAdjacentElement('afterend', statusMsg);
       
       const formData = new FormData(form);
 
       const json = JSON.stringify(Object.fromEntries(formData.entries()));
       
       
       postData('http://localhost:3000/requests', json)
       .then(data => {
           console.log(data);
           showThanksModal(msg.success);
           statusMsg.remove();
       }).catch(() => {
           showThanksModal(msg.failure);
       }).finally(() => {
           form.reset();
       });
     });
   }
 
   function showThanksModal(msg) {
     const prevModalDialog = document.querySelector('.modal__dialog');
     
     prevModalDialog.classList.add('hide');
     openModal('.modal', modalTimerId);
 
     const thanksModal = document.createElement('div');
     thanksModal.classList.add('modal__dialog');
     thanksModal.innerHTML = `
       <div class="modal__content"> 
         <div class="modal__close" data-close>&times;</div>
         <div class="modal__title">${msg}</div>
       </div>
     `;
 
     document.querySelector('.modal').append(thanksModal);
     setTimeout(() => {
       thanksModal.remove();
       prevModalDialog.classList.add('show');
       prevModalDialog.classList.remove('hide');
       closeModal('.modal');
     }, 4000);
   }
 
   fetch('http://localhost:3000/menu')
     .then(data => data.json())
     .then(res => console.log(res));
 
}

export default forms;