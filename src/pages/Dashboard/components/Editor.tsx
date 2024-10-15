import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import '../static/styles.module.css'

function Editor() {
    const [value, setValue] = useState('');

    return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}

export default Editor