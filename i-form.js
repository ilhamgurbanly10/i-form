const iFrom = () => {

    const forms = document.querySelectorAll('.i-form');

    const form = (el) => {

        let errorCount = 0;

        // requirement
        const requiredFields = el.querySelectorAll('.i-form-input[i-form-required]');
        
        const checkRequire = (e) => {
            const inp = e.target;
            const val = inp.value.trim();
            const group = inp.closest('.i-form-group');
            if (val === "") { 
                if (!group.classList.contains('i-form-required-error')) ++errorCount;
                group.classList.add('i-form-required-error') 
                disableSubmit();
            }
            else { 
                if (group.classList.contains('i-form-required-error')) --errorCount;
                group.classList.remove('i-form-required-error');
                if (errorCount < 1) enableSubmit();
            }
        }

        const checkRequireOnSubmit = (inp) => {
            const val = inp.value.trim();
            const group = inp.closest('.i-form-group');
            if (val === "") { 
                if (!group.classList.contains('i-form-required-error')) ++errorCount;
                group.classList.add('i-form-required-error') 
                disableSubmit();
                return true;
            }
            else { 
                if (group.classList.contains('i-form-required-error')) --errorCount;
                group.classList.remove('i-form-required-error');
                if (errorCount < 1) enableSubmit();
                return false;
            }
        }

        requiredFields.forEach((f) => { f.addEventListener('input', checkRequire)})
        // end-requirement

        // range
        const rangeFields = el.querySelectorAll('.i-form-input[i-form-range]');
        
        const checkRange = (e) => {
            const inp = e.target;
            const val = inp.value.trim();
            const len = val.length;
            const min = Number(inp.getAttribute('i-form-min'));
            const max = Number(inp.getAttribute('i-form-max'));
            const group = inp.closest('.i-form-group');
            if ((len < min && min && val !== "") || (len > max && max && val !== "")) { 
                if (!group.classList.contains('i-form-range-error')) ++errorCount;
                group.classList.add('i-form-range-error') 
                disableSubmit();
            }
            else { 
                if (group.classList.contains('i-form-range-error')) --errorCount;
                group.classList.remove('i-form-range-error');
                if (errorCount < 1) enableSubmit();
            }
        }

        rangeFields.forEach((f) => { f.addEventListener('input', checkRange)})
        // end-range

        // enabling-and-disabling
        const submit = el.querySelector('.i-form-submit');
        const enableSubmit = () => submit.classList.remove('i-form-disabled');
        const disableSubmit = () => submit.classList.add('i-form-disabled');
        // end-enabling-and-disabling

        // password
        const passwordTogglers = el.querySelectorAll('.i-form-password-icon'); 

        const passwordObj = {
            text: 'password',
            password: 'text',
            textIcon: '<svg viewBox="64 64 896 896" focusable="false" data-icon="eye-invisible" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"></path><path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"></path></svg>',
            passwordIcon: '<svg viewBox="64 64 896 896" focusable="false" data-icon="eye" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg>'
        }

        function togglePassword() {
            const inp = this.closest('.i-form-group').querySelector('.i-form-input');
            inp.setAttribute('type', passwordObj[inp.getAttribute('type')]);
            this.innerHTML = passwordObj[`${inp.getAttribute('type')}Icon`];
        }

        passwordTogglers.forEach((t) => { t.addEventListener('click', togglePassword); t.innerHTML = '<svg viewBox="64 64 896 896" focusable="false" data-icon="eye" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg>'})
        // end-password

        // confirmation
        const confirmationFields = el.querySelectorAll('.i-form-input[i-form-confirmation]');

        const checkConfirmation = (e) => {
            const inp = e.target;
            const val = inp.value.trim();
            const len = val.length;
            const targetVal = el.querySelector(`#${e.target.getAttribute('i-form-confirmation')}`).value;
            const min = Number(inp.getAttribute('i-form-min'));
            const max = Number(inp.getAttribute('i-form-max'));
            const group = inp.closest('.i-form-group');
            if (val !== targetVal && !group.classList.contains('i-form-required-error') && !group.classList.contains('i-form-range-error')) {
                if (!group.classList.contains('i-form-confirmation-error')) ++errorCount;
                group.classList.add('i-form-confirmation-error') 
                disableSubmit();
            }
            else { 
                if (group.classList.contains('i-form-confirmation-error')) --errorCount;
                group.classList.remove('i-form-confirmation-error');
                if (errorCount < 1) enableSubmit();
            }
            
        }

        confirmationFields.forEach((f) => { f.addEventListener('input', checkConfirmation); })
        // end-confirmation

        // regexp
        const regexpFields = el.querySelectorAll('.i-form-input[i-form-regexp]');

        const validateRegexp = (val, regexpStr) => {
            const regexp = new RegExp(regexpStr, 'g');
            return regexp.test(String(val));
          };

        const checkRegexp = (e) => {
            const inp = e.target;
            const val = inp.value.trim();
            const regexp = e.target.getAttribute('i-form-regexp');
            const group = inp.closest('.i-form-group');
            if (!group.classList.contains('i-form-required-error') && !group.classList.contains('i-form-range-error') && !group.classList.contains('i-form-confirmation-error') && !validateRegexp(val, regexp)) {
                if (!group.classList.contains('i-form-regexp-error')) ++errorCount;
                group.classList.add('i-form-regexp-error') 
                disableSubmit();
            }
            else { 
                if (group.classList.contains('i-form-regexp-error')) --errorCount;
                group.classList.remove('i-form-regexp-error');
                if (errorCount < 1) enableSubmit();
            }
            
        }

        regexpFields.forEach((f) => { f.addEventListener('input', checkRegexp); })
        // end-regexp

        // submit
        const finishIsAllowed = () => {
            let allowed = true;
            requiredFields.forEach((f) => { checkRequireOnSubmit(f) ? allowed = false : null;})
            return errorCount > 0 ? false : allowed;
        }

        const onFinish = (e) => {
            e.preventDefault();
            finishIsAllowed() ?  el.submit() : disableSubmit();
        }

        el.addEventListener('submit', onFinish);
        // end-submit
    }

    forms.forEach((f) => { form(f); })
}

iFrom();