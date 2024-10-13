import { Fragment } from "react";



const posts = [
    { id: 1, title: 'An update', body: "It's been a while since I posted..." },
    { id: 2, title: 'My new blog', body: 'I am starting a new blog!' }
];

export const Blog = () => {

    return posts.map(post =>
        <Fragment key={post.id}>
            <PostTitle title={post.title} />
            <PostBody body={post.body} />
        </Fragment>
    );
}

const PostTitle = ({ title }) => {
    return <h1>{title}</h1>
}

const PostBody = ({body}) => {
    return (
        <Article>
            <p>{body}</p>
        </Article>
    )
}