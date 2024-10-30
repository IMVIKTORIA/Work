import React, { useEffect, useRef, useState } from 'react';
import Loader from '../../Loader/Loader';

interface FileViewerProps {
	/** Тело файла */
	src?: string;
	/** Загрузка файла */
	isFileLoading: boolean;
}

/** Валидация тела файла */
const validateFileViewerBody = (body: string): boolean => {
	return Boolean(body.match(/data:application\/pdf;base64,.*$/gm));
}

/** Просмотр файла */
export default function FileViewer({ src, isFileLoading }: FileViewerProps) {
	return (
		<div className='file-viewer'>
			{
				isFileLoading
					? <div className='file-viewer__loader'><Loader /></div>
					: <iframe id="pdfViewer" className='file-viewer__container' src={src && validateFileViewerBody(src) ? src : ""} allowFullScreen={true}></iframe>
			}
		</div>
	)
}