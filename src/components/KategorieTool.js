// Get only leaves from array with ">"" notation
export function getLeaves(kategorieArray) {
    let leaves = [];
    
    kategorieArray.forEach(item => {
        let parts = item.split('>');
        let leaf = parts[parts.length - 1].trim();
        leaves.push(leaf);
    });

    return leaves;
}

// Get unique bradcrumbs from arrays with ">"" notation
// kategorie0, kategorie1 and kategorie2 arrays
export function getUniqueBradcrumbs(kategorie0, kategorie1, kategorie2) {
    if (kategorie0 == undefined) {
        kategorie0 = [];
    }
    if (kategorie1 == undefined) {
        kategorie1 = [];
    }
    if (kategorie2 == undefined) {
        kategorie2 = [];
    }

    let bradcrumbs = [];

    // For every kategorie in kategorie2 array - put it whole in bradcrumbs array
    kategorie2.forEach(item => {
        bradcrumbs.push(item);
    });

    // For every kategorie in kategorie1 array - test if it is a substring of any kategorie in bradcrumbs array
    // If not - put it whole in bradcrumbs array
    kategorie1.forEach(item => {
        let crubmIsIncluded = false;
        bradcrumbs.forEach(crumb => {
            let parts = crumb.split('>');
            let cat1 = parts[0].concat('>', parts[1]);
            if (cat1.includes(item)) {
                crubmIsIncluded = true;
            }
        });
        if (!crubmIsIncluded) {
            bradcrumbs.push(item);
        }
    });

    // For every kategorie in kategorie0 array - test if it is a substring of any kategorie in bradcrumbs array
    // If not - put it whole in bradcrumbs array
    kategorie0.forEach(item => {
        let crubmIsIncluded = false;
        bradcrumbs.forEach(crumb => {
            let parts = crumb.split('>');
            let cat0 = parts[0];
            if (cat0.includes(item)) {
                crubmIsIncluded = true;
            }
        });
        if (!crubmIsIncluded) {
            bradcrumbs.push(item);
        }
    });

    return bradcrumbs;
}
