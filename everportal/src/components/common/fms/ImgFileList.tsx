import React from 'react';
import { BASE_URL } from '@/api/apiClient';

interface FileVO {
  atchFileId: string;
  fileSn: string;
}

interface EgovImgFileListProps {
  fileList?: FileVO[];
}

const EgovImgFileList: React.FC<EgovImgFileListProps> = ({ fileList = [] }) => {
  if (!fileList || fileList.length === 0) return null;

  return (
    <div className="img-file-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '16px 0' }}>
      {fileList.map((file) => (
        <div key={`${file.atchFileId}-${file.fileSn}`} className="img-item" style={{ maxWidth: '100%' }}>
          <img
            src={`${BASE_URL}/cmm/fms/getImage.do?atchFileId=${encodeURIComponent(
              file.atchFileId
            )}&fileSn=${encodeURIComponent(file.fileSn)}`}
            alt="첨부 이미지"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}
          />
        </div>
      ))}
    </div>
  );
};

export default EgovImgFileList;
