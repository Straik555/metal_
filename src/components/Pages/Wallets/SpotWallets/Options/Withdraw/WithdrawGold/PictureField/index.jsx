/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import L from 'i18n-react';
import notification from '../../../../../../../../services/notification';
import {
  checkImageType,
  toBase64,
} from '../../../../../../../../services/helpers';

export const PictureField = ({
  srcBase64,
  setSrcBase64,
  setPhotoError,
  photoError,
}) => {
  const [isLoading, setIsloading] = useState(false);
  const [file, setFile] = useState(null);

  const translatePath = 'Wallets.Spot.CryptoWithdraw.withdraw_gold';

  const removePhotoHandler = () => {
    setFile(null);
    setPhotoError(true);
    setSrcBase64('');
  };

  useEffect(() => {
    if (!file) return;

    const allowedFormats = ['jpg', 'jpeg', 'png'];
    const checkFormat = checkImageType(file.type, allowedFormats);
    if (!checkFormat) {
      setPhotoError(true);
      notification({
        type: 'error',
        message: L.translate(`${translatePath}.photo_format_error`),
      });
      return;
    }
    if (file.size / 1024 / 1024 > 3) {
      setPhotoError(true);
      notification({
        type: 'error',
        message: L.translate(`${translatePath}.photo_size_error`), // error if file size bigger then 3 MB
      });
      return;
    }
    const getImg = async () => {
      setIsloading(true);
      try {
        const img = await toBase64(file);
        setSrcBase64(img);
        setPhotoError(false);
      } catch (err) {
        setPhotoError(true);
        const message = err.message || L.translate('Other.smg_went_wrong');
        notification({
          type: 'error',
          message,
        });
      } finally {
        setIsloading(false);
      }
    };
    getImg();
  }, [file, setSrcBase64, setPhotoError]);

  return srcBase64 ? (
    <div
      className="load-box load-box--loaded"
      style={isLoading ? { pointerEvents: 'none', cursor: 'not-allowed' } : {}}
      aria-hidden="true"
      onClick={removePhotoHandler}
    >
      <div className="upload">
        <span className="upload__icon">
          <img src={srcBase64} alt="Uploaded img" />
        </span>
        <span className="upload__text">
          {L.translate(`${translatePath}.delete_files_by`)}
        </span>
        <span className="upload__click">
          {L.translate(`${translatePath}.clicking_here`)}
        </span>
      </div>
    </div>
  ) : (
    <>
      <div className="load-box">
        <input
          type="file"
          className="load-box__item"
          accept=".jpg, .png"
          onChange={e => setFile(e.target.files[0])}
        />
        {isLoading && (
          <img className="upload__loader" src="/img/spinner.gif" alt="" />
        )}
        <div className="upload">
          <span className="upload__files">
            {L.translate(`${translatePath}.allowed_formats`)}
          </span>
          <span className="upload__text">
            {L.translate(`${translatePath}.photo_size_note`)}
          </span>
          <span className="upload__text">
            {L.translate(`${translatePath}.upload_files_by`)}
          </span>
          <span className="upload__click">
            {L.translate(`${translatePath}.clicking_here`)}
          </span>
        </div>
      </div>
      {photoError && (
        <div className="error-text">
          <p className="error-text__item">
            {L.translate(`${translatePath}.photo_error`)}
          </p>
        </div>
      )}
    </>
  );
};
