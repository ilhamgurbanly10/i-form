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