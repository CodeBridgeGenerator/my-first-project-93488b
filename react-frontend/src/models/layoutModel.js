export const layout = {
    state: {
        menuOpen: true,
        tabsOpen: true,
        currentActiveTab: 0,
        currentActiveTab2: 'home'
    }, // initial state
    reducers: {
        // handle state changes with pure functions
        setMenuOpen(state, bool) {
            return { ...state, menuOpen: bool };
        },
        setTabsOpen(state, bool) {
            return { ...state, tabsOpen: bool };
        },

        setActiveTab(state, order) {
            return { ...state, currentActiveTab: order };
        },

        setActiveTab2(state, name) {
            return { ...state, currentActiveTab2: name };
        }
    },
    effects: (dispatch) => ({
        menu(bool) {
            this.setMenuOpen(bool);
        },
        tab(bool) {
            this.setTabsOpen(bool);
        },
        activeTab(order) {
            this.setActiveTab(order);
        },
        activeTab2(name) {
            this.setActiveTab2(name);
        }
    })
};
