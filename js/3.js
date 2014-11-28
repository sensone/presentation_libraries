function(containerID, zIndex, pluginObjectID) {
    alert("[AVPlay" + id + "] setPlayerPluginObject(" + (containerID ? containerID : "") + "," + (zIndex ? zIndex : "") + "," + (pluginObjectID ? pluginObjectID : "") + ")");
    alert("[AVPlay" + id + "] old ePlayerPlugin : " + ePlayerPlugin);
    if (ePlayerPlugin) {
        this.stop();
        ePlayerPlugin.parentNode.removeChild(ePlayerPlugin);
        ePlayerPlugin = null
    }
    if (pluginObjectID) {
        var ePluginObject = document.getElementById(pluginObjectID);
        if (ePluginObject) {
            webapis._plugin(ePluginObject, "Stop");
            ePluginObject.parentNode.removeChild(ePluginObject)
        }
    }
    var innerContainer = document.createElement("div");
    innerContainer.id = PLAYER_CONTAINER_DIV_ID + id;
    innerContainer.style.position = "absolute";
    innerContainer.style.left = "0px";
    innerContainer.style.top = "0px";
    innerContainer.style.width = "0px";
    innerContainer.style.height = "0px";
    innerContainer.style.zIndex = (zIndex !== undefined && zIndex !== null) ? zIndex : PLAYER_CONTAINER_DIV_Z_INDEX;
    if (containerID) {
        var eContainerDiv = document.getElementById(containerID);
        if (eContainerDiv) {
            eContainerDiv.appendChild(innerContainer);
            this.__defineGetter__("containerID", function() {
                return containerID
            })
        } else {
            alert("[AVPlay" + id + "] !ERROR! cannot get " + containerID + " element.");
            ePlayerPlugin = null;
            return
        }
    } else {
        document.body.appendChild(innerContainer);
        this.__defineGetter__("containerID", function() {
            return innerContainer.id
        })
    }
    var bUseSEF = webapis._plugin.getSEFAvailable();
    var sPluginObjectId = pluginObjectID || PLAYER_OBJECT_ID;
    var sZIndex = "z-index:" + PLAYER_OBJECT_Z_INDEX + ";";
    eInnerContainerDiv = document.getElementById(PLAYER_CONTAINER_DIV_ID + id);
    eInnerContainerDiv.innerHTML = getPluginObjectHTML(bUseSEF, sPluginObjectId, sZIndex);
    ePlayerPlugin = document.getElementById(sPluginObjectId);
    this.__defineGetter__("zIndex", function() {
        return innerContainer.style.zIndex
    });
    if (ePlayerPlugin) {
        var evtListener = window["PlayerEventListener" + id] = new _PlayerEventListener(id, this);
        if (bUseSEF) {
            ePlayerPlugin.Open("Player", "1.000", "Player");
            if (typeof nFirmwareYear != "null" && nFirmwareYear <= 2011) {
                alert("register event handler by string");
                ePlayerPlugin.OnEvent = "PlayerEventListener" + id + ".onEvent"
            } else {
                alert("register event handler by function");
                ePlayerPlugin.OnEvent = function() {
                    evtListener.onEvent.apply(evtListener, arguments)
                }
            }
        } else {
            if (typeof nFirmwareYear != "null" && nFirmwareYear <= 2011) {
                ePlayerPlugin.OnBufferingStart = "PlayerEventListener" + id + ".onBufferingStart";
                ePlayerPlugin.OnBufferingComplete = "PlayerEventListener" + id + ".onBufferingComplete";
                ePlayerPlugin.OnBufferingProgress = "PlayerEventListener" + id + ".onBufferingProgress";
                ePlayerPlugin.OnRenderingComplete = "PlayerEventListener" + id + ".onRenderingComplete";
                ePlayerPlugin.OnStreamInfoReady = "PlayerEventListener" + id + ".onStreamInfoReady";
                ePlayerPlugin.OnCurrentPlayTime = "PlayerEventListener" + id + ".onCurrentPlayTime";
                ePlayerPlugin.OnRenderError = "PlayerEventListener" + id + ".onRenderError";
                ePlayerPlugin.OnNetworkDisconnected = "PlayerEventListener" + id + ".onNetworkDisconnected";
                ePlayerPlugin.OnConnectionFailed = "PlayerEventListener" + id + ".onConnectionFailed";
                ePlayerPlugin.OnStreamNotFound = "PlayerEventListener" + id + ".onStreamNotFound";
                ePlayerPlugin.OnAuthenticationFailed = "PlayerEventListener" + id + ".onAuthenticationFailed";
                ePlayerPlugin.OnResolutionChanged = "PlayerEventListener" + id + ".onResolutionChanged";
                ePlayerPlugin.OnAdStart = "PlayerEventListener" + id + ".onAdStart";
                ePlayerPlugin.OnAdEnd = "PlayerEventListener" + id + ".onAdEnd"
            } else {
                ePlayerPlugin.onBufferingStart = function() {
                    evtListener.onBufferingStart.apply(evtListener, arguments)
                };
                ePlayerPlugin.OnBufferingComplete = function() {
                    evtListener.onBufferingComplete.apply(evtListener, arguments)
                };
                ePlayerPlugin.OnBufferingProgress = function() {
                    evtListener.onBufferingProgress.apply(evtListener, arguments)
                };
                ePlayerPlugin.OnRenderingComplete = function() {
                    evtListener.onRenderingComplete.apply(evtListener, arguments)
                };
                ePlayerPlugin.OnStreamInfoReady = function() {
                    evtListener.onStreamInfoReady.apply(evtListener, arguments)
                };
                ePlayerPlugin.OnCurrentPlayTime = function() {
                    evtListener.onCurrentPlayTime.apply(evtListener, arguments)
                };
                ePlayerPlugin.OnRenderError = function() {
                    evtListener.onRenderError.apply(evtListener, arguments)
                };
                ePlayerPlugin.OnNetworkDisconnected = function() {
                    evtListener.onNetworkDisconnected.apply(evtListener, arguments)
                };
                ePlayerPlugin.OnConnectionFailed = function() {
                    evtListener.onConnectionFailed.apply(evtListener, arguments)
                };
                ePlayerPlugin.OnStreamNotFound = function() {
                    evtListener.onStreamNotFound.apply(evtListener, arguments)
                };
                ePlayerPlugin.OnAuthenticationFailed = function() {
                    evtListener.onAuthenticationFailed.apply(evtListener, arguments)
                };
                ePlayerPlugin.OnResolutionChanged = function() {
                    evtListener.onResolutionChanged.apply(evtListener, arguments)
                };
                ePlayerPlugin.OnAdStart = function() {
                    evtListener.onAdStart.apply(evtListener, arguments)
                };
                ePlayerPlugin.OnAdEnd = function() {
                    evtListener.onAdEnd.apply(evtListener, arguments)
                }
            }
        }
    } else {
        alert("[AVPlay" + id + "] ! ERROR ! Fail to set Player plugin object.")
    }
    return ePlayerPlugin;

    function getPluginObjectHTML(useSEF, pluginObjectID, zIndex) {
        var sPluginObjectHTML = "";
        if (useSEF) {
            sPluginObjectHTML = '<OBJECT id="' + pluginObjectID + '" classid="clsid:SAMSUNG-INFOLINK-SEF" style="position:absolute;left:0px;top:0px;width:0px;height:0px;' + zIndex + 'display:block;"></OBJECT>'
        } else {
            sPluginObjectHTML = '<OBJECT id="' + pluginObjectID + '" classid="clsid:SAMSUNG-INFOLINK-PLAYER" style="position:absolute;left:0px;top:0px;width:0px;height:0px;' + zIndex + 'display:block;"></OBJECT>'
        }
        alert("[AVPlay" + id + "] getPluginObjectHTML(" + pluginObjectID + "," + zIndex + ") returns " + sPluginObjectHTML);
        return sPluginObjectHTML
    }
}