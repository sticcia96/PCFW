PCFW.room = {
    images: {
        woot: {
            normal: function(url) {
                return url === undefined ? Lang.ui.buttonVotePositive : Lang.ui.buttonVotePositive = url;
            },
            disabled: function(url) {
                return url === undefined ? Lang.ui.buttonVotePositiveDisabled : Lang.ui.buttonVotePositiveDisabled = url;
            },
            selected: function(url) {
                return url === undefined ? Lang.ui.buttonVotePositiveSelected : Lang.ui.buttonVotePositiveSelected = url;
            },
            popout: {
                normal: function(url) {
                    return url === undefined ? Lang.ui.buttonVotePositivePopout : Lang.ui.buttonVotePositivePopout = url;
                },
                disabled: function(url) {
                    return url === undefined ? Lang.ui.buttonVotePositiveDisabledPopout : Lang.ui.buttonVotePositiveDisabledPopout = url;
                },
                selected: function(url) {
                    return url === undefined ? Lang.ui.buttonVotePositiveSelectedPopout : Lang.ui.buttonVotePositiveSelectedPopout = url;
                }
            }
        },
        meh: {
            normal: function(url) {
                return url === undefined ? Lang.ui.buttonVoteNegative : Lang.ui.buttonVoteNegative = url;
            },
            disabled: function(url) {
                return url === undefined ? Lang.ui.buttonVoteNegativeDisabled : Lang.ui.buttonVoteNegativeDisabled = url;
            },
            selected: function(url) {
                return url === undefined ? Lang.ui.buttonVoteNegativeSelected : Lang.ui.buttonVoteNegativeSelected = url;
            },
            popout: {
                normal: function(url) {
                    return url === undefined ? Lang.ui.buttonVoteNegativePopout : Lang.ui.buttonVoteNegativePopout = url;
                },
                disabled: function(url) {
                    return url === undefined ? Lang.ui.buttonVoteNegativeDisabledPopout : Lang.ui.buttonVoteNegativeDisabledPopout = url;
                },
                selected: function(url) {
                    return url === undefined ? Lang.ui.buttonVoteNegativeSelectedPopout : Lang.ui.buttonVoteNegativeSelectedPopout = url;
                }
            }
        }
    },
    text: {

    }
};