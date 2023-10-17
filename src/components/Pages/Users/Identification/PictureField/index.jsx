import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import L from 'i18n-react';
import { checkImageType, toBase64 } from '../../../../../services/helpers';
import notification from '../../../../../services/notification';
import { filesSettingsSelector } from '../../../../../redux/settings/selectors';

const PictureField = ({ onChange, document, img, text ,title,errorKYCField}) => {
  const { loading } = useSelector(filesSettingsSelector);
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState('');

  useEffect(() => {
    if (!(document?.files && document?.files[0]?.image)) {
      setSrc('');
      return;
    }
    setSrc(document.files[0].image);
  }, [document]);
  

  useEffect(() => {
    if (file && file[0]) {
      const allowedFormats = ['jpg', 'jpeg', 'png'];
      const checkFormat = checkImageType(file[0].type, allowedFormats);

      if (!checkFormat) {
        notification({
          type: 'error',
          message: L.translate(`UsersPage.Identification.picture_format_error`),
        });
        return;
      }
      if (file[0].size / 1024 / 1024 > 3) {
        notification({
          type: 'error',
          message: L.translate('UsersPage.Identification.upload_picture'), // erro if file size bigger then 3 MB
        });
        return;
      }

      const getImg = async () => {
        try {
          const img = await toBase64(file[0]);
          onChange({ file: img, document_id: document.id }); // callbeck thet will dispatch action
          setSrc(img);
        } catch (err) {
          notification({
            type: 'error',
            message: err?.massage
              ? err.massage
              : L.translate('Other.smg_went_wrong'),
          });
        }
      };

      getImg(); // converting img to base64 is async operation
    }
  }, [file]);

  return !src ? (
    <div
      className={`load-box ${errorKYCField && "label-border-color"}`}
      onClick={()=>onChange()}
      style={loading ? { pointerEvents: 'none', cursor: 'not-allowed' } : {}}
    >
      {/* <input
        type="file"
        className="load-box__item"
        accept=".jpg, .png"
        onChange={({ target }) => setFile(target.files)}
      />
      {loading && loading === document.id && (
        <img className="upload__loader" src="/img/spinner.gif" alt="" />
      )} */}
      <div className="upload">
        <span className="upload__img">
          <img src={img} alt="" />
        </span>
        <span className="upload__title">{title}</span>
        <span className="upload__text">{text}</span>
      </div>
    </div>
  ) : (
    <div
      className="load-box load-box--loaded"
      style={loading ? { pointerEvents: 'none', cursor: 'not-allowed' } : {}}
      aria-hidden="true"
      onClick={() => {
        onChange({
          file: null,
          document_id: document.id,
          file_id:
            document?.files && document?.files[0]?.id
              ? document.files[0].id
              : null,
        });
      }}
    >
      <div className="upload">
        <span className="upload__icon">
          <img src={src} alt="" />
        </span>
        {loading && loading === document.id && (
          <img className="upload__loader" src="/img/spinner.gif" alt="" />
        )}
        <span className="upload__text">
          {L.translate('UsersPage.Identification.delete_files_by')}
        </span>
        <span className="upload__click">
          {L.translate('UsersPage.Identification.clicking_here')}
        </span>
      </div>
    </div>
  );
};

export default PictureField;
