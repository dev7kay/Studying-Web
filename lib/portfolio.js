var template = require('./template');

exports.home = function(request, response){
    var html = template.HTML('Portfolio', '',
    `
    <h2>CarSimulation - Unity / C#</h2>
    <div>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/r2nVzC3pwLo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <h2>PlaneSimulation - DirectX / C++</h2>
    <div>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/wOQBZTIZuB8?list=PL3n4qD-OLsj7HjD-hnZ74n5zLiNNsVnCz" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>    
    `,
    
    ``
    );
    response.writeHead(200);
    response.end(html);
}