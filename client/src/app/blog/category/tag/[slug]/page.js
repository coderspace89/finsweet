import React from 'react'
import TagPage from '@/app/components/TagPage'

const page = async ({ params }) => {
    const { slug } = await params;
    console.log(slug);
    return (
        <div>
            <TagPage slug={slug} />
        </div>
    )
}

export default page