PCFW.room = {
    images: {
        woot: {
            normal: function(url) {
                if (url === undefined) return Lang.ui.buttonVotePositive;
                Lang.ui.buttonVotePositive = url;
            },
            disabled: function(url) {
                if (url === undefined) return Lang.ui.buttonVotePositiveDisabled;
                Lang.ui.buttonVotePositiveDisabled = url;
            },
            selected: function(url) {
                if (url === undefined) return Lang.ui.buttonVotePositiveSelected;
                Lang.ui.buttonVotePositiveSelected = url;
            },
            popout: {
                normal: function(url) {
                    if (url === undefined) return Lang.ui.buttonVotePositivePopout;
                    Lang.ui.buttonVotePositivePopout = url;
                },
                disabled: function(url) {
                    if (url === undefined) return Lang.ui.buttonVotePositiveDisabledPopout;
                    Lang.ui.buttonVotePositiveDisabledPopout = url;
                },
                selected: function(url) {
                    if (url === undefined) return Lang.ui.buttonVotePositiveSelectedPopout;
                    Lang.ui.buttonVotePositiveSelectedPopout = url;
                }
            }
        },
        meh: {
            normal: function(url) {
                if (url === undefined) return Lang.ui.buttonVoteNegative;
                Lang.ui.buttonVoteNegative = url;
            },
            disabled: function(url) {
                if (url === undefined) return Lang.ui.buttonVoteNegativeDisabled;
                Lang.ui.buttonVoteNegativeDisabled = url;
            },
            selected: function(url) {
                if (url === undefined) return Lang.ui.buttonVoteNegativeSelected;
                Lang.ui.buttonVoteNegativeSelected = url;
            },
            popout: {
                normal: function(url) {
                    if (url === undefined) return Lang.ui.buttonVoteNegativePopout;
                    Lang.ui.buttonVoteNegativePopout = url;
                },
                disabled: function(url) {
                    if (url === undefined) return Lang.ui.buttonVoteNegativeDisabledPopout;
                    Lang.ui.buttonVoteNegativeDisabledPopout = url;
                },
                selected: function(url) {
                    if (url === undefined) return Lang.ui.buttonVoteNegativeSelectedPopout;
                    Lang.ui.buttonVoteNegativeSelectedPopout = url;
                }
            }
        }
    },
    text: {

    }
};