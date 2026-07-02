import React from 'react';
import { BASE_URL } from '@/api/apiClient';

interface FileVO {
  atchFileId: string;
  fileSn: string;
  orignlFileNm: string;
  fileMg: string;
}

interface FileListProps {
  fileList?: FileVO[];
  updateFlag?: boolean;
  onDeleteFile?: (atchFileId: string, fileSn: string) => void;
}

const FileList: React.FC<FileListProps> = ({
  fileList = [],
  updateFlag = false,
  onDeleteFile,
}) => {
  const handleDownload = (atchFileId: string, fileSn: string) => {
    const downloadUrl = `${BASE_URL}/cmm/fms/FileDown.do?atchFileId=${encodeURIComponent(
      atchFileId
    )}&fileSn=${encodeURIComponent(fileSn)}`;
    window.open(downloadUrl);
  };

  if (!fileList || fileList.length === 0) return null;

  return (
    <div className="file-list-container" style={{ margin: '10px 0', fontSize: '0.9rem' }}>
      {fileList.map((file) => (
        <div key={`${file.atchFileId}-${file.fileSn}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          {updateFlag ? (
            <>
              <span className="file-name" style={{ color: 'var(--text-main)' }}>{file.orignlFileNm}</span>
              <span className="file-size" style={{ color: 'var(--text-muted)' }}>({file.fileMg} bytes)</span>
              <button
                type="button"
                className="btn-delete-file"
                style={{
                  padding: '2px 8px',
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onClick={() => onDeleteFile && onDeleteFile(file.atchFileId, file.fileSn)}
              >
                삭제
              </button>
            </>
          ) : (
            <>
              <a
                href="#LINK"
                style={{ color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'underline' }}
                onClick={(e) => {
                  e.preventDefault();
                  handleDownload(file.atchFileId, file.fileSn);
                }}
              >
                {file.orignlFileNm}
              </a>
              <span className="file-size" style={{ color: 'var(--text-muted)' }}>({file.fileMg} bytes)</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default FileList;
