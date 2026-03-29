'use client'

import React from 'react'

/**
 * Custom admin styles injected globally into the Payload admin panel.
 */
const AdminStyles: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <style>{`
                /* Center upload nodes in the Lexical editor */
                .lexical-upload {
                    display: flex !important;
                    justify-content: center !important;
                }

                .lexical-upload .lexical-upload__card {
                    margin-left: auto;
                    margin-right: auto;
                }

                .lexical-upload img {
                    border-radius: 6px;
                }

                .lexical-block {
                    margin-left: auto;
                    margin-right: auto;
                }
            `}</style>
            {children}
        </>
    )
}

export default AdminStyles
