/* eslint-disable import/no-commonjs */
const axios = require(`axios`);

// exports.createSchemaCustomization = async ({ actions }) => {
//     const typeDefs = `
//         type DevArticle implements Node {
//             id: String!
//             title: String!
//             description: String!
//             cover_image: String
//             published: Boolean!
//             published_at: Date! @dateformat
//             tag_list: [String]
//             slug: String!
//             path: String!
//             url: String!
//             canonical_url: String!
//             comments_count: String
//             positive_reactions_count: Int
//             page_views_count: Int
//             published_timestamp: Date! @dateformat
//             body_markdown: String
//         }
//     `;
//     actions.createTypes(typeDefs);
// };

exports.sourceNodes = async (
    { actions, createNodeId, createContentDigest },
    { apiKey }
) => {
    const { createNode } = actions;

    const result = await axios.get(`https://dev.to/api/articles/me/published`, {
        headers: { "api-key": apiKey }
    });

    result.data.forEach(post => {
        const { id, body_markdown, ...data } = post;

        const node = {
            id: createNodeId(id),
            internal: {
                type: `DevArticle`,
                mediaType: `text/markdown`,
                content: body_markdown
            },
            ...data
        };
        const contentDigest = createContentDigest(node);
        node.internal.contentDigest = contentDigest;

        createNode(node);
    });
};
