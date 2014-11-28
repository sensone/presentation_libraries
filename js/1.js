function (successCallback, errorCallback, sec) {
  alert("[AVPlay"+id+"] play("+typeof successCallback+","+typeof errorCallback+","+(sec!==undefined?sec:"")+")");
  var isec = _checkNumberType(sec);

  if (!_isType(successCallback,"function") || !_isType(errorCallback,"function")) {
    throw ErrorsHelper.createWebAPIException_byLegacyCode(WebAPIException.TYPE_MISMATCH_ERR)
  }

  if (isec < 0) {
    if (typeof errorCallback=="function") {
      errorCallback(ErrorsHelper.createWebAPIException_byType("InvalidValuesError"));
      this._setStatus(webapis.avplay.PLAY_STATE_STOPPED)
    }
    return
  }

  if (!bInitialize) {
    alert("[AVPlay"+id+"] Do init() first..");
    return false
  }

  if (this.status != webapis.avplay.PLAY_STATE_PREPARED) {
    alert("[AVPlay"+id+"] !THROW ERROR! WebAPIDOMErrorCode.INVALID_STATE_ERR");
    throw ErrorsHelper.createWebAPIException_byLegacyCode(WebAPIException.INVALID_STATE_ERR)
  }

  if (oPlayOption.totalBufferSize) {
    this.setTotalBufferSize(oPlayOption.totalBufferSize)
  }

  if (oPlayOption.pendingBufferSize) {
    this.setPendingBufferSize(oPlayOption.pendingBufferSize)
  }

  if (oPlayOption.initialBufferSize) {
    this.setInitialBufferSize(oPlayOption.initialBufferSize)
  }

  if (oPlayOption.mode3D) {
    this.setPlayerProperty(this.PROPERTY_TYPE_3D, 3, oPlayOption.mode3D)
  }

  if (oPlayOption.drm && oPlayOption.drm.cookie) {
    this.setPlayerProperty(this.PROPERTY_TYPE_COOKIE, oPlayOption.drm.cookie, oPlayOption.drm.cookie.length)
  }

  if (oPlayOption.macrovision && oPlayOption.macrovision.dot !== undefined) {
    this.setOutputDOT(oPlayOption.macrovision.dot)
  }

  if (oPlayOption.HEVC) {
    alert("oPlayOption.HEVC.customData..................." + oPlayOption.HEVC.customData);
    alert("oPlayOption.HEVC.licenseURL..................." + oPlayOption.HEVC.licenseURL);
    var ret = this.setHEVC(oPlayOption.HEVC.customData, oPlayOption.HEVC.licenseURL);
    if (ret) {
      alert("[VideoPlayer] setHEVC succeed!!")
    } else {
      alert("[VideoPlayer] setHEVC failed!!");
      if (typeof errorCallback=="function") {
        errorCallback(new ErrorsHelper.createWebAPIException_byLegacyCode(WebAPIException.AVPLAY_UNSUPPORTED_VIDEO_FORMAT_ERR));
        this._setStatus(webapis.avplay.PLAY_STATE_STOPPED)
      }
      return
    }
  }

  if (this.authHeader=="none") {
    this.setPlayerProperty(this.PROPERTY_TYPE_AUTH_BASIC,0,0)
  } else {}

  cbOnPlaySuccess = successCallback;
  var retValue = webapis._plugin(ePlayerPlugin,"StartPlayback", (isec !== undefined ? Number(isec) : 0));

  if (retValue ==-1 ) {
    if (typeof errorCallback=="function") {
      errorCallback(ErrorsHelper.createWebAPIException_byType("UnknownError"));
      this._setStatus(webapis.avplay.PLAY_STATE_STOPPED)
    }
    return
  }

  if (!bFrontPanelLock && bBDPlayer) {
    iFrontPanel.setState(iFrontPanel.Enum.FRONT_DISPLAY_PLAY)
  }

  this._setStatus(webapis.avplay.PLAY_STATE_STARTED);

  setScreenSaver(false);

  return retValue==1;
}
