function Validator(options) {
  function validate(inputElement, rule) {
    let errElement = inputElement.parentElement.querySelector(
      options.errSelector
    );
    let errText = rule.test(inputElement.value);

    if (errText) {
      errElement.innerText = errText;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  }
  let formElement = document.querySelector(options.form);

  if (formElement) {
    options.rules.forEach((element) => {
      let inputElement = formElement.querySelector(element.selector);

      if (inputElement) {
        inputElement.onblur = () => {
          validate(inputElement, element);
        };

        inputElement.oninput = () => {
          let errElement =
            inputElement.parentElement.querySelector(".form__mesage");
          errElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
        };
      }
    });
  }
}

//defind name method
Validator.isName = function (selector) {
  return {
    selector,
    test(value) {
      return value.trim() ? undefined : "Vui lòng nhập trường này !";
    },
  };
};
// defind email method
Validator.isEmail = function (selector) {
  return {
    selector,
    test(value) {
      let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      return regex.test(value) ? undefined : "Vui lòng nhập đúng định dạng";
    },
  };
};
Validator.isPassword = function (selector, min) {
  return {
    selector,
    test(value) {
        return value.length >= 6 ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`
    },
  };
};

Validator.conFirmPassword = function(selector, getConfirm) {
    return {
        selector,
        test(value) {
            return value === getConfirm() ? undefined : 'Không trùng khớp'
        }
    }
}

Validator({
  form: "#form-1",
  errSelector: ".form__mesage",
  rules: [
    Validator.isName("#name"),
     Validator.isEmail("#email"),
     Validator.isPassword("#password", 6),
     Validator.conFirmPassword('#password__confirm', function() {
        return document.querySelector('#form-1 #password').value
     })
    ],
});
