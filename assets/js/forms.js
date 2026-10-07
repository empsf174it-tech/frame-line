document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form[data-validate="true"]');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        if (input.hasAttribute('required')) {
          if (!input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
          } else if (input.type === 'email' && !validateEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
            isValid = false;
          } else if (input.type === 'number') {
            const min = parseFloat(input.getAttribute('min'));
            const max = parseFloat(input.getAttribute('max'));
            const val = parseFloat(input.value);
            if (isNaN(val)) {
              showError(input, 'Please enter a valid number');
              isValid = false;
            } else if (!isNaN(min) && val < min) {
              showError(input, `Minimum value is ${min}`);
              isValid = false;
            } else if (!isNaN(max) && val > max) {
              showError(input, `Maximum value is ${max}`);
              isValid = false;
            } else {
              showSuccess(input);
            }
          } else {
            showSuccess(input);
          }
        }
      });
      
      if (isValid) {
        const successMsg = form.querySelector('.form-success-msg');
        if (successMsg) {
          successMsg.style.display = 'block';
          form.reset();
          inputs.forEach(input => {
            input.classList.remove('is-valid');
          });
          setTimeout(() => {
            successMsg.style.display = 'none';
          }, 5000);
        }
      }
    });

    // Clear error on input
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('is-invalid');
        input.classList.remove('is-valid');
        const errorMsg = input.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('form-error')) {
          errorMsg.textContent = '';
        }
      });
    });
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function showError(input, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    let errorMsg = input.nextElementSibling;
    if (!errorMsg || !errorMsg.classList.contains('form-error')) {
      errorMsg = document.createElement('div');
      errorMsg.classList.add('form-error');
      input.parentNode.insertBefore(errorMsg, input.nextSibling);
    }
    errorMsg.textContent = message;
  }

  function showSuccess(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    let errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains('form-error')) {
      errorMsg.textContent = '';
    }
  }
});
