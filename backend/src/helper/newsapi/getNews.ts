import axios from "axios";
import { getCurrentApiKey, incrementReqCount } from "./cached";
import dotenv from "dotenv";
dotenv.config();

interface NewsArticle {
    "title": string,
    "description": string,
    "content": string,
    "url": string,
    "image": string,
    "publishedAt": string,
    "source": {
        "name": string,
        "url": string
    }
};

let data = [
    {
        "title": "Today's Olympics schedule: Team GB events, Day 16 medal highlights and how to watch the Paris Games",
        "description": "Paris Olympics come to a close",
        "content": "* FIRST NAME\n* LAST NAME\n* EMAIL Your email address\n* PASSWORD Must be at least 6 characters, include an upper and lower case character and a number Show\n* YEAR OF BIRTH You must be at least 18 years old to create an account 2006 2005 2004 2003 2002 ... [927 chars]",
        "url": "https://www.standard.co.uk/sport/sport-olympics/olympics-2024-schedule-today-team-gb-medal-highlights-tv-channel-paris-day-16-b1175820.html",
        "image": "https://static.standard.co.uk/2024/08/08/9/54/SEI216308070.jpg?width=1200&auto=webp&quality=75",
        "publishedAt": "2024-08-11T05:00:58Z",
        "source": {
            "name": "Evening Standard",
            "url": "https://www.standard.co.uk"
        }
    },
    {
        "title": "Fusion power might be 30 years away but we will reap its benefits well before",
        "description": "Discoveries made in pursuit of nuclear fusion have potentially huge practical applications in everything from curing cancer to superior batteries for EVs",
        "content": "When James Watt’s first commercial steam engine was installed in March 1776 at Bloomfield Colliery, Tipton in the West Midlands, it was hailed as a mechanical marvel. Yet few could have anticipated the way steam engines would change the world.\nDevelo... [12090 chars]",
        "url": "https://www.theguardian.com/science/article/2024/aug/11/nuclear-fusion-research-tae-power-solutions-cancer-propulsion",
        "image": "https://i.guim.co.uk/img/media/82e66a83c122378ba6c490b7e217b86967e1ca2f/0_65_2550_1530/master/2550.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdG8tZGVmYXVsdC5wbmc&enable=upscale&s=a57bb17b50b6006a85812c63b2ab59f4",
        "publishedAt": "2024-08-11T05:00:03Z",
        "source": {
            "name": "The Guardian",
            "url": "https://www.theguardian.com"
        }
    },
    {
        "title": "Macron is hugging France’s heroes as though he dare not let the Olympics go",
        "description": "Medal success has offered the president welcome weeks of respite in his country’s fraught political climate – but what happens when the athletes go home?",
        "content": "The French president, Emmanuel Macron, is famed for his enthusiastic hugging of sports stars – as the footballer Kylian Mbappé can attest. Macron walked on to the pitch, somewhat awkwardly pulled Mbappé to his chest and patted his head to console him... [5665 chars]",
        "url": "https://www.theguardian.com/sport/article/2024/aug/11/macron-france-heroes-olympics-athletes",
        "image": "https://i.guim.co.uk/img/media/adfc2fc005f81b7a208ea3e3b870f404963a63f3/0_111_5836_3502/master/5836.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdG8tZGVmYXVsdC5wbmc&enable=upscale&s=b833d98c528a66c982c6a84e397f4ef3",
        "publishedAt": "2024-08-11T05:00:03Z",
        "source": {
            "name": "The Guardian",
            "url": "https://www.theguardian.com"
        }
    },
    {
        "title": "Get Sky Sports' Premier League and EFL bundle with UHD and huge £330 saving",
        "description": "The new Sky deal also includes free Netflix and includes crystal clear Ultra HD just in time for Liverpool and Everton to kick off their 2024/25 Premier League season",
        "content": "Football fans can now watch the 2024/25 Premier League season in Ultra HD and make a huge saving with Sky's new 'lowest price' deal. The TV and broadband provider is currently offering its Sky Sports, Sky Stream, Sky TV and Netflix bundle for £43 a m... [3222 chars]",
        "url": "https://www.liverpoolecho.co.uk/sport/football/football-news/sky-sports-premier-league-efl-29681419",
        "image": "https://i2-prod.liverpoolecho.co.uk/incoming/article29681656.ece/ALTERNATES/s1200/0_gettyimages-1748287899-612x612.jpg",
        "publishedAt": "2024-08-11T05:00:00Z",
        "source": {
            "name": "Liverpool Echo",
            "url": "https://www.liverpoolecho.co.uk"
        }
    },
    {
        "title": "What time and tv channel is Olympics closing ceremony on today?",
        "description": "The 2024 Games comes to a close today.",
        "content": "We have more newsletters\nThank you for subscribing!\nSomething went wrong, please try again later.\nInvalid email Something went wrong, please try again later.\nWant the day's sports headlines straight to your inbox? Our FREE newsletter will keep you ah... [1446 chars]",
        "url": "https://www.irishmirror.ie/sport/other-sport/what-time-tv-channel-olympics-33429794",
        "image": "https://i2-prod.irishmirror.ie/incoming/article33429737.ece/ALTERNATES/s1200/0_The-Olympic-flame-in-Paris.jpg",
        "publishedAt": "2024-08-11T05:00:00Z",
        "source": {
            "name": "Irish Mirror",
            "url": "https://www.irishmirror.ie"
        }
    }
]


export default async function getNews(searchString: string): Promise<NewsArticle[]> {
    console.log("\ngetNews() CALLED");
    
    const numberOfArticles = 5; //How many articles to fetch

    try {

        const apiKeyNumber:number = await getCurrentApiKey();
        const apiKey = process.env[`GNEWSAPIKEY${apiKeyNumber}`] as string;

        // const response = await axios.get(`https://gnews.io/api/v4/search?q=${searchString}&in=title,description,content&lang=en&nullable=image&sortby=publishedAt&max=${numberOfArticles}&apikey=${apiKey}`);
        
        // if(response.status == 200){
        //     const data = await response.data.articles!;
        //     return data;
        // } else {
        //     return 0;
        // }

        return data;

    } catch (error) {
        console.error(error);
        return [];
    }
}