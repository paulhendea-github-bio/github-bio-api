export default ({ transparent, title }) => `
<svg fill="none" viewBox="0 0 800 400" width="800" height="400" xmlns="http://www.w3.org/2000/svg">
    <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
            <style>
                .container {
                font-family: monospace;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin: 0;
                width: 100%;
                height: 400px;
                ${transparent ? '' : 'background-color: rgb(25, 25, 25);'}
                border-radius: 10px;
                color: rgba(255, 255, 255, .75);
                text-align: center;
                }
                .type-writer {
                display: inline-block;
                }
                .line-1 {
                width: 100%;
                margin: 0 auto;
                border-right: 2px solid rgba(255, 255, 255, .75);
                font-size: 2.5rem;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                }
                /* Animation */
                .anim-typewriter {
                animation: typewriter 3s steps(${
                  title.length
                }) 1s infinite alternate both,
                    blinkTextCursor 500ms infinite normal;
                }
                @keyframes typewriter {
                0% {
                    width: 0;
                }
                30% {
                    width: 0;
                }
                60% {
                    width: 100%;
                }
                100% {
                    width: 100%
                }
                }
                @keyframes blinkTextCursor {
                from {
                    border-right-color: rgba(255, 255, 255, .75);
                }
                to {
                    border-right-color: transparent;
                }
                }
            </style>
            <div class="container">
                <div class="type-writer">
                    <p class="line-1 anim-typewriter">${title}</p>
                </div>
            </div>
        </div>
    </foreignObject>
</svg>
`;
