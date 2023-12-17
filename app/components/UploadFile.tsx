"use client"

import { useState } from "react";
import { useEdgeStore } from "../lib/edgestore";
import Link from "next/link";

export default function UploadFile() {
    const [file, setFile] = useState<File>();
    const [urls, setUrls] = useState<{
        url: string;
    }>();
    const { edgestore } = useEdgeStore();

    return (
        <div className="flex flex-col items-center m-6 gap-2">
            
            <input 
                type="file" 
                className="file-input w-full max-w-xs" 
                onChange={(e) => {
                    setFile(e.target.files?.[0]);
                }}
            />
            <button
                className="btn"
                onClick={async () => {
                    if(file){
                        const res = await edgestore.publicFiles.upload({ file });
                        setUrls({
                            url: res.url,
                        })
                    }
                }}
            >
                Upload
            </button>

            {urls?.url && <Link href={urls.url} target="_blank">View File</Link>}

        </div>
    )

}