module.exports = {
    toBeReadonly() {
        return {
            compare(actual) {
                return {
                    pass: actual.getAttribute('readOnly').then(readOnly => readOnly.match(/\breadonly\b/))
                };
            }
        };
    },
    toBeTypeOf() {
        return {
            compare(actual, gametype) {
                return {
                    pass: actual.getAttribute('class').then(cssClass => cssClass.match(`\\b${gametype}\\b`))
                };
            }
        };
    },
    toBeDisabled() {
        return {
            compare(actual) {
                return {
                    pass: actual.getAttribute('class').then(cssClass => cssClass.match(/\bdisabled\b/))
                };
            }
        };
    },
    toBeSelected() {
        return {
            compare(actual) {
                return {
                    pass: actual.getAttribute('class').then(cssClass => cssClass.match(/\bselected\b/))
                };
            }
        };
    },
    toHaveCardinalityOf() {
        return {
            compare(actual, expected) {
                return {
                    pass: actual.length === expected
                };
            }
        };
    }
};
