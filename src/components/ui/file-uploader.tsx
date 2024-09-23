import React from "react";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  acceptedFileTypes: string[];
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, acceptedFileTypes }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="w-full h-full text-dark border-light border rounded-xl">
        <label
          htmlFor="file-upload"
          className="flex rounded-md border-gray-300 border-2 px-6 pt-5 pb-6 cursor-pointer hover:border-gray-500 border-dashed w-full h-full items-center justify-center border-none">
          <button
            type="button"
            className="relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-200 ring-0 ring-transparent focus-visible:outline-none focus-visible:ring-1 disabled:ring-0 focus-visible:ring-ring disabled:pointer-events-auto disabled:opacity-50 bg-true-white/20 border border-light text-dark shadow-xs hover:ring-gray-alpha-100 active:ring-gray-alpha-200 disabled:text-light h-9 px-4 py-2 rounded-full hover:ring ps-4 gap-1.5">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="2"
              viewBox="0 0 256 256"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M224,152v56a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V152a8,8,0,0,1,16,0v56H208V152a8,8,0,0,1,16,0ZM93.66,85.66,120,59.31V152a8,8,0,0,0,16,0V59.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,85.66Z"></path>
            </svg>
            Upload content file
          </button>
        </label>
        <input
          className="sr-only"
          accept={acceptedFileTypes.join(",")}
          type="file"
          id="file-upload"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex justify-end">
        <p className="text-sm text-light font-normal ms-auto">
          {acceptedFileTypes.map((type) => (
            <code key={type} className="text-xs bg-muted/80 border border-border rounded-md p-0.5 mr-1">
              {type}
            </code>
          ))}
        </p>
      </div>
    </div>
  );
};
