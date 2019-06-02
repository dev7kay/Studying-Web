module.exports = {
    HTML:function(title, list, body, control){
        return `
        <!doctype html>
        <html>        
        <head>
            <title>Kevin's Web - ${title}</title>
            <meta charset="utf-8">
            <style>            
                body{
                    background-color: rgb(215, 250, 215);
                    color: blue;
                }
            </style>
        </head>
        <body>
            <h1><a href="/">Kevin's - Home</a></h1>
            <a href="/portfolio">Portfolio</a>
            <a href="/author">Author</a>            
            ${list}
            ${control}
            ${body}            
        </body>
        </html>
        `;
    },list:function(topics){
        var list = '<ul>';
        var i = 0;
        while(i < topics.length){
            list += `<li><a href="/?id=${encodeURIComponent(topics[i].id)}">${unescape(topics[i].title)}</a></li>`;
            i++;
        }
        list += '</ul>';
        return list;
    },authorSelect:function(authors, author){
        var tag = '';
        var i = 0;
        while(i < authors.length){
            var selected = '';
            if(authors[i].id === author){
                selected = ' selected';
            }
            tag += `<option value="${authors[i].id}"${selected}>${authors[i].name}</option>`;
            i++;
        }
        return `
            <select name="author">
                ${tag}
            </select>
        `
    },authorTable:function(authors){
        var tag = '<table>';
        var i = 0;
        while(i < authors.length){
            tag += `
            <tr>
                <td>${authors[i].name}</td>
                <td>${authors[i].profile}</td>
                <td><a href="/author/update?id=${authors[i].id}">Update</a></td>
                <td>
                  <form action="/author/delete_process" method="post">
                    <input type="hidden" name="id" value="${authors[i].id}">
                    <input type="submit" value="delete">
                  </form>
                </td>
            </tr>
            `
            i++;
        }
        tag += '</table>';
        return tag;
    }
}