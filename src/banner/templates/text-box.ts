export default ({ transparent, title }) => `
<svg fill="none" viewBox="0 0 800 400" width="800" height="400" xmlns="http://www.w3.org/2000/svg">
    <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
            <style>
                .container {
                    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin: 0;
                    width: 100%;
                    height: 400px;
                    ${transparent ? '' : 'background-color: rgb(25, 25, 25);'}
                    background-size: 600% 400%;
                    border-radius: 10px;
                    text-align: center;
                }
                .shape {
                    fill: transparent;
                    stroke-dasharray: 140 540;
                    stroke-dashoffset: -474;
                    stroke-width: 8px;
                    stroke: #19f6e8;
                }
                .text {
                    color: #fff;
                    font-family: 'Roboto Condensed';
                    font-size: 22px;
                    letter-spacing: 8px;
                    line-height: 32px;
                    position: relative;
                    top: -48px;
                }
                @keyframes draw {
                    0% {
                        stroke-dasharray: 140 540;
                        stroke-dashoffset: -474;
                        stroke-width: 8px;
                    }
                    100% {
                        stroke-dasharray: 760;
                        stroke-dashoffset: 0;
                        stroke-width: 2px;
                    }
                }
                .svg-wrapper .shape {
                    -webkit-animation: 1s draw linear forwards;
                    animation: 1s draw linear forwards;
                }
            </style>
            <div class="container">
                <div class="svg-wrapper">
                    <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
                        <rect class="shape" height="60" width="320" />
                    </svg>
                    <div class="text">${title}</div>
                </div>
            </div>
        </div>
    </foreignObject>
</svg>
`;
