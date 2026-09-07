const http = require('http');

const PORT = 3000;

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Coffee Haven</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Quicksand:wght@300;400;600&display=swap');

        :root {
            --bg-color: #fdf6e3;
            --text-main: #3e2723;
            --accent-warm: #d84315;
            --card-bg: #fff3e0;
            --brown-dark: #2e1a12;
            --brown-light: #8d6e63;
        }

        body, html {
            margin: 0;
            padding: 0;
            background-color: var(--bg-color);
            color: var(--text-main);
            font-family: 'Quicksand', sans-serif;
            overflow-x: hidden;
            scroll-behavior: smooth;
        }

        h1, h2, h3, h4, .crazy-font {
            font-family: 'Berkshire Swash', cursive;
            font-weight: normal;
        }

        /* Hero Section */
        .hero {
            height: 100vh;
            background: linear-gradient(rgba(46, 26, 18, 0.7), rgba(46, 26, 18, 0.4)), url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: #fff;
            position: relative;
        }

        .hero h1 {
            font-size: 6rem;
            margin: 0;
            text-shadow: 2px 4px 15px rgba(0,0,0,0.7);
            animation: dropIn 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
            opacity: 0;
            transform: translateY(-50px);
            color: #ffccbc;
        }

        .hero p {
            font-size: 1.8rem;
            margin-top: 10px;
            text-shadow: 1px 2px 5px rgba(0,0,0,0.8);
            animation: fadeIn 2s ease forwards;
            animation-delay: 1s;
            opacity: 0;
        }

        .scroll-down {
            position: absolute;
            bottom: 30px;
            font-size: 2.5rem;
            animation: bounce 2s infinite;
            cursor: pointer;
            color: #ffccbc;
            text-decoration: none;
            text-shadow: 0 2px 5px rgba(0,0,0,0.5);
        }

        /* Animations */
        @keyframes dropIn {
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-20px); }
            60% { transform: translateY(-10px); }
        }
        @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
        }
        @keyframes slideUp {
            from { transform: translateY(40px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        /* Container */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 4rem 2rem;
        }

        .section-title {
            text-align: center;
            font-size: 4rem;
            color: var(--brown-dark);
            margin-bottom: 4rem;
            position: relative;
            display: inline-block;
            left: 50%;
            transform: translateX(-50%);
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            width: 60%;
            height: 5px;
            background: var(--accent-warm);
            bottom: -15px;
            left: 20%;
            border-radius: 3px;
        }

        /* Types of Coffee */
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2.5rem;
        }

        .card {
            background: var(--card-bg);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(62, 39, 35, 0.15);
            transition: all 0.4s ease;
            cursor: pointer;
            animation: slideUp 1s ease forwards;
            opacity: 0;
            border: 2px solid transparent;
        }
        
        .card:nth-child(1) { animation-delay: 0.2s; }
        .card:nth-child(2) { animation-delay: 0.4s; }
        .card:nth-child(3) { animation-delay: 0.6s; }

        .card:hover {
            transform: translateY(-15px) scale(1.03);
            box-shadow: 0 20px 40px rgba(62, 39, 35, 0.25);
            border: 2px solid var(--accent-warm);
        }

        .card img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            transition: transform 0.6s ease;
        }

        .card:hover img {
            transform: scale(1.15);
        }

        .card-content {
            padding: 2rem;
            text-align: center;
        }

        .card-title {
            font-size: 2.5rem;
            color: var(--accent-warm);
            margin: 0 0 15px 0;
        }

        .card p {
            font-size: 1.1rem;
            line-height: 1.6;
        }

        /* Benefits Section */
        .benefits {
            background: var(--brown-dark);
            color: var(--bg-color);
            padding: 6rem 2rem;
            position: relative;
        }
        
        .benefits .section-title {
            color: var(--card-bg);
        }
        
        .benefit-list {
            list-style: none;
            padding: 0;
            max-width: 900px;
            margin: 0 auto;
        }
        
        .benefit-item {
            background: rgba(255, 255, 255, 0.05);
            margin: 1.5rem 0;
            padding: 2rem;
            border-radius: 15px;
            display: flex;
            align-items: center;
            font-size: 1.2rem;
            transition: all 0.3s ease;
            border-left: 6px solid var(--accent-warm);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .benefit-item:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateX(15px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }
        
        .benefit-icon {
            font-size: 3rem;
            margin-right: 2rem;
            animation: float 3s ease-in-out infinite;
        }

        .benefit-text {
            line-height: 1.6;
        }

        /* Footer */
        footer {
            text-align: center;
            padding: 4rem;
            background: #1a0f0a;
            color: #fff;
            font-size: 1.3rem;
        }
        
        footer p {
            margin: 0;
        }
        
        .heart {
            color: var(--accent-warm);
            display: inline-block;
            animation: pulse 1.5s infinite;
            font-size: 1.5rem;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.4); }
            100% { transform: scale(1); }
        }

        /* Steam Animation Container */
        .cup-container {
            position: relative;
            width: 150px;
            margin: 5rem auto 2rem;
            text-align: center;
        }
        
        .cup-emoji {
            font-size: 6rem;
            z-index: 2;
            position: relative;
            animation: float 4s ease-in-out infinite;
        }
        
        .steam {
            position: absolute;
            font-size: 2.5rem;
            color: var(--brown-light);
            opacity: 0;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            animation: rise 3s infinite ease-in;
        }
        
        .steam:nth-child(2) { animation-delay: 1s; left: 40%; }
        .steam:nth-child(3) { animation-delay: 2s; left: 60%; }
        
        @keyframes rise {
            0% { top: -20px; opacity: 0; transform: translateX(-50%) scale(1); }
            20% { opacity: 0.8; }
            100% { top: -90px; opacity: 0; transform: translateX(-50%) scale(2) rotate(20deg); }
        }
    </style>
</head>
<body>

    <section class="hero">
        <h1>Coffee Haven</h1>
        <p class="crazy-font">A warm embrace in every cup.</p>
        <a href="#explore" class="scroll-down">↓</a>
    </section>

    <section id="explore" class="container">
        <h2 class="section-title">Brew Varieties</h2>
        <div class="grid">
            <div class="card">
                <img src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Espresso">
                <div class="card-content">
                    <h3 class="card-title">Espresso</h3>
                    <p>Rich, bold, and concentrated. The purest essence of coffee beans, topped with a delicate crema.</p>
                </div>
            </div>
            <div class="card">
                <img src="https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Latte">
                <div class="card-content">
                    <h3 class="card-title">Latte</h3>
                    <p>A smooth dance of espresso and velvety steamed milk, crowned with beautiful art.</p>
                </div>
            </div>
            <div class="card">
                <img src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Cappuccino">
                <div class="card-content">
                    <h3 class="card-title">Cappuccino</h3>
                    <p>The perfect balance of equal parts espresso, steamed milk, and a cloud of airy foam.</p>
                </div>
            </div>
        </div>
        
        <div class="cup-container">
            <div class="steam">〰</div>
            <div class="steam">〰</div>
            <div class="steam">〰</div>
            <div class="cup-emoji">☕</div>
        </div>
    </section>

    <section class="benefits">
        <h2 class="section-title">Why We Love It</h2>
        <ul class="benefit-list">
            <li class="benefit-item">
                <span class="benefit-icon">✨</span>
                <div class="benefit-text">
                    <strong class="crazy-font" style="font-size: 1.8rem; color: var(--accent-warm);">Rich Antioxidants</strong><br>
                    Coffee is one of the biggest sources of antioxidants in the modern diet, fighting free radicals and keeping you glowing.
                </div>
            </li>
            <li class="benefit-item">
                <span class="benefit-icon">⚡</span>
                <div class="benefit-text">
                    <strong class="crazy-font" style="font-size: 1.8rem; color: var(--accent-warm);">Energy & Focus</strong><br>
                    That gentle caffeine hug sharpens your mind, boosts your mood, and gets you ready to conquer the day.
                </div>
            </li>
            <li class="benefit-item">
                <span class="benefit-icon">❤️</span>
                <div class="benefit-text">
                    <strong class="crazy-font" style="font-size: 1.8rem; color: var(--accent-warm);">Warm Connections</strong><br>
                    It's not just a drink; it's a ritual. A shared cup of coffee is the start of countless beautiful conversations.
                </div>
            </li>
        </ul>
    </section>

    <footer>
        <p class="crazy-font" style="font-size: 2.5rem; margin-bottom: 15px; color: var(--accent-warm);">Stay Warm!</p>
        <p>Brewed with <span class="heart">♥</span> just for you.</p>
    </footer>

</body>
</html>
`;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
});

server.listen(PORT, () => {
    console.log(`\n==============================================`);
    console.log(`☕ Coffee Haven is serving warmly!`);
    console.log(`🌍 http://localhost:${PORT}`);
    console.log(`==============================================\n`);
});
