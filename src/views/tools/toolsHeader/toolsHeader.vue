<script setup>
import {ref} from 'vue'
import axios from "axios";
import {getInstance} from "@/apis/tools/toolsApi.js";

const active = ref(0)
//   tab item data
const toolsData = {
  "ai": [
    {
      'title': 'app',
      'id': 'app',
      'child': [
        {
          'title': 'chatgpt',
          'img': 'https://cdn.oaistatic.com/_next/static/media/favicon-16x16.9b8dbb69.png',
          'url': 'https://chat.openai.com',
          'description': 'openai 出品的生成式ai大语言模型。'
        },
        {
          'title': '文心一言',
          'img': 'https://ebui-cdn.bj.bcebos.com/yiyan-logo.png',
          'url': 'https://yiyan.baidu.com',
          'description': '百度出品的生成式ai大语言模型。'
        },
        {
          'title': 'gemini',
          'img': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
          'url': 'https://makersuite.google.com/app/prompts/new_freeform',
          'description': 'google推出的生成式ai大语言模型。'
        },
        {
          'title': '通义千问',
          'img': 'https://img.alicdn.com/imgextra/i4/O1CN01melXau1il47065d8j_!!6000000004452-2-tps-887-200.png',
          'url': 'https://tongyi.aliyun.com/qianwen/?spm=5176.28326591.0.0.40f76ee1RvX9ob',
          'description': '阿里推出的生成式ai语言模型。'
        },
        {
          'title': '讯飞星火',
          'img': 'data:image/png;base64,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',
          'url': 'https://xinghuo.xfyun.cn/desk',
          'description': '讯飞星火认知大模型，是由科大讯飞推出的新一代认知智能大模型。',
        },
        {
          'title': '字节豆包',
          'img': 'https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao/logo_new.png',
          'url': 'https://www.doubao.com/chat/',
          'description': '豆包是你的AI 聊天智能对话问答助手，写作文案翻译情感陪伴编程全能工具。豆包为你答疑解惑，提供灵感，辅助创作，也可以和你畅聊任何你感兴趣的话题。'
        },
        {
          'title': '智谱清言',
          'img': 'https://chatglm.cn/img/icons/favicon.ico',
          'url': 'https://chatglm.cn/main/detail',
          'description': '中国版对话语言模型，与GLM大模型进行对话。'
        },
        {
          'title': '天工AI',
          'img': 'https://chat.tiangong.cn/logo.ico',
          'url': 'https://chat.tiangong.cn/?isLogin=true',
          'description': '天工是国内首个对标 ChatGPT 的双千亿级大语言模型，也是一个对话式AI助手。',
        },
        {
          'title': '元象大模型',
          'img': 'https://chat.xverse.cn/xchat/assets/favicon-326e4712.svg',
          'url': 'https://chat.xverse.cn/xchat/index.html',
          'description': '元象通用大模型，自研高性能，从零训练，国内领先，可大幅降低开发门槛与推理成本，满足不同复杂度的多任务需求。'
        },
        {
          'title': 'coze',
          'img': 'https://sf-coze-web-cdn.coze.com/obj/coze-web-us/obric/coze/favicon.1970.png',
          'url': 'https://www.coze.com/space/7322343649252081670/bot/7322344849628332038',
          'description': '字节推出的海外市场的生成式对话助手。'
        },
        {
          "title": " \n            Notion AI        ",
          "url": "https://www.notion.so/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2022/11/notion.png",
          "description": " 这是真人工智能，不是人工智障"
        }, {
          "title": " \n            Stable Diffusion WebUI        ",
          "url": "https://github.com/AUTOMATIC1111/stable-diffusion-webui",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/stablediffusionweb.png",
          "description": " Github 源码，可以自己搭建一个 Stable Diffusion 算法的 Web 版"
        }, {
          "title": " \n            头像生成卡通        ",
          "url": "https://toonme.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/favicon-32x32-1.png",
          "description": " 把头像交给 AI，实现你的卡通梦"
        }, {
          "title": " \n            DALL·E 2        ",
          "url": "https://openai.com/dall-e-2/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/DALL%C2%B7E-2.jpg",
          "description": " OpenAI旗下DALL·E 2模型，可以从自然语言的description中创造出现实的图像和艺术"
        }, {
          "title": " \n            NUWA        ",
          "url": "https://nuwa-infinity.microsoft.com/#/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/nuwa.png",
          "description": " 一个多模态生成模型，旨在从给定的文本、图像或视频输入中生成高质量的图像和视频"
        }, {
          "title": " \n            Stability AI        ",
          "url": "https://stability.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/stability.png",
          "description": " 根据你输入的文字description，生成相应的img"
        }, {
          "title": " \n            Novel AI        ",
          "url": "https://novelai.net/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/novel.png",
          "description": " 用于人工智能辅助写作、讲故事、虚拟陪伴"
        }, {
          "title": " \n            6pen art        ",
          "url": "https://6pen.art/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/6open-art.png",
          "description": " 利用文本生成绘画作品的产品"
        }, {
          "title": " \n            Deep Dream Generator        ",
          "url": "https://deepdreamgenerator.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/deep-dream-1.png",
          "description": " 在文本框内输入文字内容，选择想要的img格式、风格等"
        }, {
          "title": " \n            Parti        ",
          "url": "https://parti.research.google/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/pencil.png",
          "description": " 一款文本、图像生成工具"
        }, {
          "title": " \n            DeepAI        ",
          "url": "https://deepai.org/machine-learning-model/text2img",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/deep-ai.jpg",
          "description": " 文本转图像--AI图像生成器API"
        }, {
          "title": " \n            fotor        ",
          "url": "https://www.fotor.com/features/ai-image-generator/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/fotor.png",
          "description": " AI图像生成器"
        }, {
          "title": " \n            Runway        ",
          "url": "https://runwayml.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/runway.png",
          "description": " 由人工智能驱动的创意工具"
        }, {
          "title": " \n            即时AI        ",
          "url": "https://js.design/AI-gallery",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/jishi-ai.png",
          "description": " 将创意一键变成创作"
        }, {
          "title": " \n            PicSo        ",
          "url": "https://picso.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/picso.png",
          "description": " 是一个文本到图像的人工智能艺术生成器应用和创意数字艺术的在线平台"
        }, {
          "title": " \n            Dream AI        ",
          "url": "https://dream.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/dream-ai.png",
          "description": " 利用人工智能的力量创造美丽的艺术作品"
        }, {
          "title": " \n            LuciaAI        ",
          "url": "https://luciaai.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/lucia.png",
          "description": " 是一个先进的人工智能写作助手"
        }, {
          "title": " \n            Tome AI        ",
          "url": "https://beta.tome.app/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/TOME.png",
          "description": " 由AI驱动的讲故事形式"
        }, {
          "title": " \n            beautiful.ai        ",
          "url": "https://www.beautiful.ai/presentation-maker",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/beautiful.png",
          "description": " 第一个具有人工智能设计的演示文稿制作器"
        }, {
          "title": " \n            DeckRobot        ",
          "url": "https://www.deckrobot.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/deckrobot.png",
          "description": " 将毫不费力地设计出数百张幻灯片"
        }, {
          "title": " \n            Slidekick        ",
          "url": "https://www.sitekick.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/Slidekick.png",
          "description": " AI登陆页面构建器"
        }, {
          "title": " \n            Presentations.AI        ",
          "url": "https://presentations.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/presentations.png",
          "description": " 瞬间获得演讲超能力"
        }, {
          "title": " \n            Alpaca        ",
          "url": "https://www.getalpaca.io/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/Alpaca.png",
          "description": " 用于图像生成的AI模型"
        }, {
          "title": " \n            AI Render        ",
          "url": "https://airender.gumroad.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/AI-Render.png",
          "description": " 使用稳定扩散AI创造令人惊奇的图像"
        }, {
          "title": " \n            autobackend        ",
          "url": "https://www.autobackend.dev/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/autobackend.png",
          "description": " 在几秒钟内创建一个后端"
        }, {
          "title": " \n            ABtesting.ai        ",
          "url": "https://abtesting.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/abtesting.png",
          "description": " 用AI A/B测试软件提高转化率"
        }, {
          "title": " \n            Mutiny        ",
          "url": "https://www.mutinyhq.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/mutiny-1.png",
          "description": " 把你的网站变成你的第一收入渠道"
        }, {
          "title": " \n            QuickBooks        ",
          "url": "https://quickbooks.intuit.com/global/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/presentations.png",
          "description": " 适用于小型企业的智能、简单的在线会计软件"
        }, {
          "title": " \n            AdCreative.ai        ",
          "url": "https://www.adcreative.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/adcreative.jpg",
          "description": " 生成广告创意，帮助你销售更多"
        }, {
          "title": " \n            Adflow        ",
          "url": "https://www.adflow.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/Adflow.jpg",
          "description": " 为你的广告文案增光添彩"
        }, {
          "title": " \n            Anyword        ",
          "url": "https://anyword.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/Anyword.png",
          "description": " AI文案写作，AI写作助手& 文本生成器"
        }, {
          "title": " \n            Osmosis        ",
          "url": "https://osmosis.studio/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/Osmosis.jpg",
          "description": " 一个基于内容意识的网络协作设计工具，用于生成销售真实产品的人工智能广告"
        }, {
          "title": " \n            Pencil        ",
          "url": "https://www.trypencil.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/pencil.png",
          "description": " 为电子商务提供无限的广告创意"
        }, {
          "title": " \n            LensAI        ",
          "url": "https://lens-ai.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/lensai.jpg",
          "description": " 人工智能驱动的上下文计算机视觉广告解决方案"
        }, {
          "title": " \n            SuperBuzz        ",
          "url": "https://www.superbuzz.io/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/superbuzz.png",
          "description": " 使用GPT-3技术提高保留流量和利润"
        }, {
          "title": " \n            AI21 Labs        ",
          "url": "https://www.ai21.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/ai21.png",
          "description": " 通过使机器成为人类的思想伙伴来重新想象我们的阅读和写作方式"
        }, {
          "title": " \n            Aleph Alpha        ",
          "url": "https://www.aleph-alpha.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/Aleph-Alpha.png",
          "description": " 人工智能领导者"
        }, {
          "title": " \n            Anthropic        ",
          "url": "https://www.anthropic.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/anthropic.jpg",
          "description": " 是一家人工智能安全和研究公司"
        }, {
          "title": " \n            Cohere        ",
          "url": "https://cohere.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/cohere.png",
          "description": " 开发人员的NLP工具包和语言模型"
        }, {
          "title": " \n            DeepMind        ",
          "url": "https://www.deepmind.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/DeepMind.jpg",
          "description": " 研究和建立安全的人工智能系统"
        }, {
          "title": " \n            Meta AI        ",
          "url": "https://ai.facebook.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/meta-ai.png",
          "description": " 专注于生成式人工智能"
        }, {
          "title": " \n            Alpa        ",
          "url": "https://opt.alpa.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/alpa.jpg",
          "description": " 服务于OPT-175B语言模型"
        }, {
          "title": " \n            BLOOM        ",
          "url": "https://bigscience.notion.site/BLOOM-BigScience-176B-Model-ad073ca07cdf479398d5f95d88e218c4",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/BLOOM.png",
          "description": " 为你的笔记、任务、维基和数据库提供一体化的工作空间"
        }, {
          "title": " \n            Cedille        ",
          "url": "https://cedille.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Cedille.jpg",
          "description": " 用于文本生成的NLP平台"
        }, {
          "title": " \n            Perplexity        ",
          "url": "https://www.perplexity.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/06/1679494099Perplexity.png",
          "description": " 智能总结并展示信息源"
        }, {
          "title": " \n            Hugging Face        ",
          "url": "https://huggingface.co/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/DistilBERT.png",
          "description": " 开源数据集和预训练模型"
        }, {
          "title": " \n            HyperCLOVA        ",
          "url": "https://www.navercorp.com/promotion/pressReleasesView/30546",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/HyperCLOVA.png",
          "description": " 一个类似于GPT-3的韩语模型训练网站"
        }, {
          "title": " \n            LaMDA        ",
          "url": "https://www.blog.google/technology/ai/lamda/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/LaMDA.png",
          "description": " 突破性的对话技术"
        }, {
          "title": " \n            Turing-NLG        ",
          "url": "https://turing.microsoft.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Turing-NLG.png",
          "description": " 微软图灵项目"
        }, {
          "title": " \n            Megatron NLG        ",
          "url": "https://developer.nvidia.com/blog/using-deepspeed-and-megatron-to-train-megatron-turing-nlg-530b-the-worlds-largest-and-most-powerful-generative-language-model/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Megatron-NLG.jpg",
          "description": " 生成语言模型 "
        }, {
          "title": " \n            Muse        ",
          "url": "https://muse.lighton.ai/home",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/muse.png",
          "description": " 是一个访问VLM-4的API"
        }, {
          "title": " \n            SambaNova Systems        ",
          "url": "https://sambanova.ai/solutions/gpt/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/SambaNova-Systems.jpg",
          "description": " SambaNova套件简化了类似于人类的语言"
        }, {
          "title": " \n            Wu Dao 1.0        ",
          "url": "https://syncedreview.com/2021/03/23/chinas-gpt-3-baai-introduces-superscale-intelligence-model-wu-dao-1-0/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Wu-Dao-1.0.jpg",
          "description": " BAAI推出超大规模智能模型"
        }, {
          "title": " \n            youtube        ",
          "url": "https://www.youtube.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/youtube.jpg",
          "description": " 用GitHub Copilot设计一个API"
        }, {
          "title": " \n            Interior AI        ",
          "url": "https://interiorai.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Interior-AI.png",
          "description": " 室内设计理念的灵感，以及使用人工智能的虚拟分期应用程序"
        }, {
          "title": " \n            Adobe Podcast        ",
          "url": "https://podcast.adobe.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Adobe-Podcast.png",
          "description": " 人工智能音频录制和编辑"
        }, {
          "title": " \n            Atomic AI        ",
          "url": "https://atomic.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Atomic-AI.jpg",
          "description": " 人工智能驱动的RNA药物发现，具有原子级的精确性"
        }, {
          "title": " \n            Character AI        ",
          "url": "https://beta.character.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Character-AI.jpg",
          "description": " 是一个神经语言模型的聊天机器人网络应用"
        }, {
          "title": " \n            D-ID        ",
          "url": "https://studio.d-id.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/did.png",
          "description": " 使用带有文字或音频的静止图像，就能创建专业视频"
        }, {
          "title": " \n            Lensa        ",
          "url": "https://prisma-ai.com/lensa",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Lensa.jpg",
          "description": " 是一个多合一的图像编辑应用程序"
        }, {
          "title": " \n            MegaPortraits        ",
          "url": "https://samsunglabs.github.io/MegaPortraits/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/MegaPortraits.jpg",
          "description": " 一次性拍摄百万像素的神经头像"
        }, {
          "title": " \n            MyHeritage        ",
          "url": "https://www.myheritage.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/MyHeritage.png",
          "description": " 人工智能生成的图像"
        }, {
          "title": " \n            Photo AI        ",
          "url": "https://photoai.io/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/photoai.jpg",
          "description": " 第一个人工智能摄影师"
        }, {
          "title": " \n            Profile Picture        ",
          "url": "https://www.profilepicture.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Profile-Picture.jpg",
          "description": " AI资料img的生成和制作"
        }, {
          "title": " \n            Ready Player Me        ",
          "url": "https://labs.readyplayer.me/avatar",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Ready-Player-Me.jpg",
          "description": " 一个使用Dall-E的人工智能化身创造者"
        }, {
          "title": " \n            Wonder-AI        ",
          "url": "https://www.wonder-ai.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Wonder-AI.jpg",
          "description": " 一个生成性人工智能系统，专门生成奇幻生物和环境的图像"
        }, {
          "title": " \n            Flowrite        ",
          "url": "https://www.flowrite.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Flowrite.jpg",
          "description": " 为你的日常沟通增色"
        }, {
          "title": " \n            Blog Idea Generator        ",
          "url": "https://www.usetopic.com/blog-idea-generator",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Blog-Idea-Generator.png",
          "description": " 博客创意生成器--即时的内容灵感"
        }, {
          "title": " \n            Makelog        ",
          "url": "https://www.makelog.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/makelog.png",
          "description": " 将产品更新转化为你最有力的资产"
        }, {
          "title": " \n            AI Buddy        ",
          "url": "https://aibuddy.chat/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/AI-Buddy.png",
          "description": " 用于WhatsApp的聊天工具"
        }, {
          "title": " \n            AskBrian        ",
          "url": "https://www.askbrian.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/AskBrian.jpg",
          "description": " 专业人士的人工智能助手"
        }, {
          "title": " \n            BLOONY        ",
          "url": "https://bloony.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/BLOONY.png",
          "description": " 人工智能聊天伙伴"
        }, {
          "title": " \n            Jerome Powell Bot        ",
          "url": "https://www.institutionalinvestor.com/article/b1tktmhcfdyqsk/An-Interview-With-a-Hyper-Realistic-AI-Powered-Simulation-of-Jerome-Powell",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Jerome-Powell-Bot.jpg",
          "description": " 采访超现实的、由人工智能驱动的杰罗姆-鲍威尔的模拟人"
        }, {
          "title": " \n            Kuki        ",
          "url": "https://www.kuki.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/kuki.png",
          "description": " 一个人工智能大脑，旨在为人类提供娱乐服务"
        }, {
          "title": " \n            Project December        ",
          "url": "https://projectdecember.net/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Project-December.jpg",
          "description": " 使用GPT-3来创建超现实的聊天机器人"
        }, {
          "title": " \n            Quickchat        ",
          "url": "https://www.quickchat.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Quickchat.png",
          "description": " 建立像人一样说话的人工智能助理的技术"
        }, {
          "title": " \n            Emerson        ",
          "url": "https://www.quickchat.ai/emerson",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Emerson.png",
          "description": " 是一台可以和你对话的人工智能计算机"
        }, {
          "title": " \n            Grammarly        ",
          "url": "https://www.grammarly.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2022/06/grammarly.jpg",
          "description": " 是一款在线语法纠正和校对工具"
        }, {
          "title": " \n            Bing AI 作图        ",
          "url": "https://cn.bing.com/create",
          "img": "https://static.runoob.com/images/svg/bing.svg",
          "description": " 必应图像创作器，输入文字生成img"
        }, {
          "title": " \n            Tabnine        ",
          "url": "https://www.tabnine.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/tabnine.png",
          "description": " 是一个AI代码助手"
        }, {
          "title": " \n            Copilot X        ",
          "url": "https://github.com/features/preview/copilot-x",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/copilot-x.png",
          "description": " GitHub 和 OpenAI 合作开发的一个代码自动生成工具"
        }, {
          "title": " \n            RemoveBG        ",
          "url": "https://www.remove.bg/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/remove-bg.jpg",
          "description": " img去除背景"
        }, {
          "title": " \n            Outplay        ",
          "url": "https://outplayhq.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Outplay.jpg",
          "description": " AI生成销售话术"
        }, {
          "title": " \n            CoWriter        ",
          "url": "https://cowriter.org/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/cowriter.png",
          "description": " AI辅助写作"
        }, {
          "title": " \n            AI Data Sidekick        ",
          "url": "https://www.airops.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/ai-data-sidekick-1.jpg",
          "description": " AI编写SQL代码 "
        }, {
          "title": " \n            Fireflies        ",
          "url": "https://fireflies.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Fireflies.png",
          "description": " 该工具可插入 Zoom、Teams 或 Webex 等流行的视频会议工具，并自动执行做笔记和创建转录的过程"
        }, {
          "title": " \n            dreamlike.art        ",
          "url": "https://dreamlike.art/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/dreamlike.jpg",
          "description": " 在几秒钟内创造出令人惊叹的原创艺术"
        }, {
          "title": " \n            Phygital+        ",
          "url": "https://phygital.plus/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/P.jpg",
          "description": " 让创作者在没有代码的情况下使用神经网络"
        }, {
          "title": " \n            ARC Lab        ",
          "url": "https://arc.tencent.com/zh/ai-demos/faceRestoration",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/arclab1.jpg",
          "description": " 腾讯ARC实验室推出的AI人像修复小工具"
        }, {
          "title": " \n            Papercup        ",
          "url": "https://www.papercup.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/papercup.png",
          "description": " 人工智能驱动的配音"
        }, {
          "title": " \n            Voice Mode        ",
          "url": "https://www.voicemod.net/zh/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Voice-Mode.png",
          "description": " 免费即时变声器"
        }, {
          "title": " \n            Soundraw        ",
          "url": "https://soundraw.io/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/soundraw.jpg",
          "description": " 全新的AI音乐平台"
        }, {
          "title": " \n            LALAL        ",
          "url": "https://www.lalal.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/lalal.png",
          "description": " 提供音乐源分离服务，使用ai技术从任何音频中提取人声，伴奏和多种乐器"
        }, {
          "title": " \n            Boomy        ",
          "url": "https://www.boomy.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/boomy.png",
          "description": " 在几秒钟内创作出原创歌曲"
        }, {
          "title": " \n            Endel        ",
          "url": "https://endel.io/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/endel.jpg",
          "description": " 个性化的声音景观"
        }, {
          "title": " \n            MURF        ",
          "url": "https://murf.ai/%20",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/murf.png",
          "description": " 将文字输出为语音，可用于视频制作"
        }, {
          "title": " \n            Mubert        ",
          "url": "https://mubert.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/mubert.jpg",
          "description": " 为内容创作者、品牌和开发者提供的新的免版税音乐生态系统 "
        }, {
          "title": " \n            Riffusion        ",
          "url": "https://www.riffusion.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/riffusion.png",
          "description": " 一个基于AI生成音乐的项目"
        }, {
          "title": " \n            polyAI        ",
          "url": "https://poly.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/poly.png",
          "description": " 语音助手，企业智能客服语音服务"
        }, {
          "title": " \n            Cascadeur        ",
          "url": "https://cascadeur.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Cascadeur.jpg",
          "description": " 最简单的AI辅助关键帧动画制作软件"
        }, {
          "title": " \n            MunchAI        ",
          "url": "https://www.getmunch.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/munch.png",
          "description": " 自动将长视频转换为数据驱动的短片，用于社交媒体"
        }, {
          "title": " \n            Fliki        ",
          "url": "https://fliki.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/fliki.jpg",
          "description": " 用AI语音将文字变成视频"
        }, {
          "title": " \n            pollinations        ",
          "url": "https://pollinations.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/pollinations.jpg",
          "description": " 您的引擎 个性化的媒体"
        }, {
          "title": " \n            Autodraw        ",
          "url": "https://www.autodraw.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/autodraw-1.jpg",
          "description": " 人工智能画画平台"
        }, {
          "title": " \n            Bard        ",
          "url": "https://bard.google.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/googleBard.png",
          "description": " Google 推出的 AI 聊天对话机器人 Bard"
        }, {
          "title": " \n            Codeium        ",
          "url": "https://codeium.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/1679564778Codeium.png",
          "description": " 人工智能编码及检索"
        }, {
          "title": " \n            CodiumAI        ",
          "url": "https://www.codium.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/1679564753CodiumAI.png",
          "description": " AI 代码测试工具"
        }, {
          "title": " \n            Codiga        ",
          "url": "https://www.codiga.io/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Codiga.png",
          "description": " AI 代码实时分析"
        }, {
          "title": " \n            Hocoos AI 建站        ",
          "url": "https://hocoos.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/06/hocoos-logo.jpeg",
          "description": " AI 建站神器，5 分钟完成建站"
        }, {
          "title": " \n            Replicate        ",
          "url": "https://replicate.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/06/replicate-logo.png",
          "description": " 使用云 API 运行开源机器学习模型"
        }, {
          "title": "         Codex        ",
          "url": "https://openai.com/blog/openai-codex",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/06/qmruasgh98rw6a4u4yop.webp",
          "description": " OpenAI 旗下 AI 代码生成训练模型，AI 系统可以将自然语言翻译成代码，"
        }
      ]
    },
    {
      'title': 'programming',
      'app': 'programming',
      'child': [
        {
          "title": " \n            autobackend        ",
          "url": "https://www.autobackend.dev/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/autobackend.png",
          "description": " 在几秒钟内创建一个后端"
        }, {
          "title": " \n            BerriAI        ",
          "url": "https://berri.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/berri-ai.png",
          "description": " 连接您的数据并在几分钟内建立生产就绪的chatGPT应用程序"
        }, {
          "title": " \n            AutoRegex        ",
          "url": "https://www.autoregex.xyz/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/autogerex.jpg",
          "description": " 使用人工智能更容易创建正则表达式"
        }, {
          "title": " \n            Tabnine        ",
          "url": "https://www.tabnine.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/tabnine.png",
          "description": " 是一个AI代码助手"
        }, {
          "title": " \n            Code Snippets        ",
          "url": "https://codesnippets.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/codesnippets.png",
          "description": " GPT-4驱动的VSCode的代码片段"
        }, {
          "title": " \n            HeyCLI        ",
          "url": "https://www.heycli.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/HeyCLI.png",
          "description": " 将自然语言翻译成终端命令"
        }, {
          "title": " \n            Bifrost        ",
          "url": "https://www.bifrost.so/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Bifrost.png",
          "description": " 将Figma设计自动转化为干净的React代码"
        }, {
          "title": " \n            SpellBox        ",
          "url": "https://spellbox.app/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/SpellBbx.png",
          "description": " 人工智能编程助手"
        }, {
          "title": " \n            Debuild        ",
          "url": "https://debuild.app/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Debuild.png",
          "description": " 快速构建网络应用程序"
        }, {
          "title": " \n            AirOps        ",
          "url": "https://www.airops.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/AirOps.jpg",
          "description": " 使用强大的配方集编写SQL、文档和更多内容"
        }, {
          "title": " \n            AI Query        ",
          "url": "https://aiquery.co/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/AI-Query.jpg",
          "description": " 在几秒钟内用人工智能生成SQL查询"
        }, {
          "title": " \n            HTTPie AI        ",
          "url": "https://httpie.io/ai",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/HTTPie-AI.png",
          "description": " 一种与API互动的新方式"
        }, {
          "title": " \n            Ghostwriter        ",
          "url": "https://replit.com/site/ghostwriter",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Ghostwriter.jpg",
          "description": " 用人工智能加速编码-replit"
        }, {
          "title": " \n            ExplainDev        ",
          "url": "https://explain.dev/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/ExplainDev.png",
          "description": " 根据上下文回答你的问题的代码解释器"
        }, {
          "title": " \n            Codeball        ",
          "url": "https://codeball.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/codeball.png",
          "description": " 人工智能驱动的代码审查"
        }, {
          "title": " \n            What The Diff        ",
          "url": "https://whatthediff.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/What-The-Diff-1.png",
          "description": " 由人工智能驱动的代码审查助手"
        }, {
          "title": " \n            Ask Command        ",
          "url": "https://askcommand.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/ask-command.png",
          "description": " 人工智能驱动的开发者助手"
        }, {
          "title": " \n            PLZ-CIL        ",
          "url": "https://github.com/m1guelpf/plz-cli",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/plz-cli.png",
          "description": " 用自然语言查找终端命令"
        }, {
          "title": " \n            Codeium        ",
          "url": "https://codeium.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/1679564778Codeium.png",
          "description": " 人工智能编码及检索"
        }, {
          "title": " \n            CodiumAI        ",
          "url": "https://www.codium.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/1679564753CodiumAI.png",
          "description": " AI 代码测试工具"
        }, {
          "title": " \n            Codiga        ",
          "url": "https://www.codiga.io/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Codiga.png",
          "description": " AI 代码实时分析"
        }, {
          "title": " \n            Warp.AI        ",
          "url": "https://www.warp.dev/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/warp.png",
          "description": " 与您的终端完全集成的 AI"
        }, {
          "title": " \n            Safurai        ",
          "url": "https://www.safurai.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/safurai-1.png",
          "description": " 是一个基于人工智能的IDE扩展，旨在帮助开发人员进行编码、调试和重构"
        }, {
          "title": " \n            brancher.ai        ",
          "url": "https://www.brancher.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/brancher.png",
          "description": " 是一个无代码平台，它可以让你仅用很短的时间通过连接 AI 模型来创建 AI 驱动的应用程序"
        }, {
          "title": " \n            GitHub Copilot        ",
          "url": "https://copilot.github.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/github-copilot.jpg",
          "description": " 你的人工智能配对程序员"
        }, {
          "title": " \n            Akkio        ",
          "url": "https://www.akkio.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/akkio.png",
          "description": " 是一个易于使用、可扩展和负担得起的无代码人工智能平台，用于实时决策"
        }, {
          "title": " \n            Browse AI        ",
          "url": "https://www.browse.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/browse.png",
          "description": " 监控任何网页的变化"
        }
      ]
    }, {
      'title': 'write',
      'id': 'write',
      'child': [
        {
          "title": " \n            FlowUs        ",
          "url": "https://flowus.cn/login",
          "img": "https://tools.haiyong.site/wp-content/uploads/2022/11/flowus.jpg",
          "description": " 一款具有特色的、 Notion 类的 All in One 生产力工具"
        }, {
          "title": " \n            Compose AI        ",
          "url": "https://www.compose.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/Compose.png",
          "description": " AI写作工具"
        }, {
          "title": " \n            Jasper        ",
          "url": "https://www.jasper.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/jaster.png",
          "description": " 文本生成器，使用 AI 制作出令人惊叹的文案"
        }, {
          "title": " \n            Texta        ",
          "url": "https://texta.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/texta.png",
          "description": " 为你的博客获得高质量的SEO优化和吸引人的内容"
        }, {
          "title": " \n            Writeseed        ",
          "url": "https://writeseed.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/writeseed.jpg",
          "description": " 最好的人工智能写作工具"
        }, {
          "title": " \n            Elephas        ",
          "url": "https://elephas.app/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Elephas.png",
          "description": " 适用于Mac的个人AI写作助手"
        }, {
          "title": " \n            Everylead        ",
          "url": "https://www.everylead.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/everylead.png",
          "description": " 个性化每条线索"
        }, {
          "title": " \n            Automata        ",
          "url": "https://byautomata.io/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/automata.png",
          "description": " 将博客和视频作为LinkedIn的帖子、Twitter的线程和新闻通讯重新使用"
        }, {
          "title": " \n            Gramara        ",
          "url": "https://gramara.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/gramara.jpg",
          "description": " 立即写出流利的英语"
        }, {
          "title": " \n            Coda AI        ",
          "url": "https://coda.io/product/ai-alpha",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/coda.png",
          "description": " 使用Coda AI来拉动背景信息并帮助你添加内容"
        }, {
          "title": " \n            Type        ",
          "url": "https://type.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/type.jpg",
          "description": " 由人工智能驱动的文件编辑器"
        }, {
          "title": " \n            GoCharlie        ",
          "url": "https://gocharlie.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/gocharlie.jpg",
          "description": " 为内容创作者提供的生成性人工智能平台"
        }, {
          "title": " \n            HyperWrite        ",
          "url": "https://www.hyperwriteai.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/HyperWrite.jpg",
          "description": " 最先进的人工智能写作伴侣"
        }, {
          "title": " \n            Hoppy Copy        ",
          "url": "https://www.hoppycopy.co/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Hoppy-Copy.png",
          "description": " 邮件AI，自动帮你写回复邮件"
        }, {
          "title": " \n            Writers Brew        ",
          "url": "https://writersbrew.app/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Writers-Brew.png",
          "description": " 加速阅读和写作2倍的速度和效果"
        }, {
          "title": " \n            Jenni        ",
          "url": "https://jenni.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/jenni.png",
          "description": " 与Jenni AI一起为你的写作增色"
        }, {
          "title": " \n            Easy Peasy        ",
          "url": "https://easy-peasy.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/easy-peasy.png",
          "description": " 最佳人工智能作家"
        }, {
          "title": " \n            Moonbeam        ",
          "url": "https://www.gomoonbeam.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Moonbeam.png",
          "description": " 是一个长篇写作的AI助手"
        }, {
          "title": " \n            Rytr        ",
          "url": "https://rytr.me/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/rytr.png",
          "description": " 写作助手"
        }, {
          "title": " \n            Writerly        ",
          "url": "https://writerly.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Writerly.jpg",
          "description": " 在几秒钟内产生超相关的、SEO优化的内容。"
        }, {
          "title": " \n            Frase        ",
          "url": "https://www.frase.io/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/frase.png",
          "description": " 研究、撰写和优化高质量的SEO内容"
        }, {
          "title": " \n            Quillbot        ",
          "url": "https://quillbot.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/quillbot.jpg",
          "description": " 一个人工智能驱动的转述工具，可以增强你的写作能力"
        }, {
          "title": " \n            Sudowrite        ",
          "url": "https://www.sudowrite.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Sudowrite.jpg",
          "description": " 神奇的写作AI打破作家的障碍"
        }, {
          "title": " \n            Writer        ",
          "url": "https://writer.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Writer.png",
          "description": " 使用Writer的人工智能写作平台大规模解锁品牌内容"
        }, {
          "title": " \n            Supernormal        ",
          "url": "https://supernormal.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/supernormal.jpg",
          "description": " 更快地编写会议笔记"
        }, {
          "title": " \n            SEO AI        ",
          "url": "https://seo.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/SEO.png",
          "description": " 在更短的时间内创建更多高质量的SEO内容，并确保其性能"
        }, {
          "title": " \n            Writesonic        ",
          "url": "https://writesonic.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/writersonic.jpg",
          "description": " 创作的最佳AI作家"
        }, {
          "title": " \n            Copy.AI        ",
          "url": "https://www.copy.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/copy.png",
          "description": " 为企业生成高质量的文案"
        }, {
          "title": " \n            Boo.ai        ",
          "url": "https://boo.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/booai.png",
          "description": " 是一种新型的文本编辑器，它使用人工智能生成副本并帮助您集思广益"
        }, {
          "title": " \n            Orchard        ",
          "url": "https://www.orchard.ink/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/orchard.png",
          "description": " 是一个文本编辑器，可以帮助作家构思、迭代和创新"
        }, {
          "title": " \n            Notion AI        ",
          "url": "https://www.notion.so/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/notion.png",
          "description": " 工作更快，写得更好，想得更多"
        }, {
          "title": " \n            Readwise Reader        ",
          "url": "https://readwise.io/read?ref=ness_labs",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/readwise.png",
          "description": " 第一款为实力派读者打造的 \"稍后阅读 \"应用程序"
        }, {
          "title": " \n            纯纯写作        ",
          "url": "https://writer.drakeet.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/chunchun-xiezuo.png",
          "description": " 绝不丢失文本编辑器"
        }, {
          "title": " \n            秘塔写作猫        ",
          "url": "https://www.xiezuocat.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/mita-xiezuomao.png",
          "description": " 集AI写作、多人协作、文本校对、改写润色、自动配图等功能为一体"
        }, {
          "title": " \n            Wordtune        ",
          "url": "https://www.wordtune.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Wordtune.png",
          "description": " 你的个人写作助理"
        }, {
          "title": " \n            copysmith        ",
          "url": "https://copysmith.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/copysmith.jpg",
          "description": " 为企业和电子商务提供人工智能内容创作"
        }, {
          "title": " \n            通义听悟        ",
          "url": "https://tingwu.aliyun.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/06/tingwu-logo.png",
          "description": " 实时记录交流内容，多语言翻译"
        }
      ]
    },
    {
      'title': 'design',
      'id': 'design',
      child: [
        {
          "title": " \n            Adobe Firefly        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/adobe-firefly.jpg",
          "url": "https://firefly.adobe.com/",
          "description": " 用Firefly做出无限的创作"
        }, {
          "title": " \n            Fiction        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/fiction.png",
          "url": "https://www.fiction.com/",
          "description": " AI照片和头像生成器"
        }, {
          "title": " \n            Uizard        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/uizard.jpg",
          "url": "https://uizard.io/autodesigner/",
          "description": " 使用简单的文本来生成应用程序和网站的多屏幕模拟图"
        }, {
          "title": " \n            Contentinator        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/contentinator.png",
          "url": "https://contentinator.com/",
          "description": " 为您的 Figma 设计生成逼真的内容"
        }, {
          "title": " \n            Galileo AI        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Galileo-AI.png",
          "url": "https://www.usegalileo.ai/",
          "description": " 界面设计的副手"
        }, {
          "title": " \n            Clickable        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/clickable.png",
          "url": "https://www.clickable.so/",
          "description": " 用AI在几秒钟内生成广告"
        }, {
          "title": " \n            Flair        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/flair.png",
          "url": "https://flair.ai/",
          "description": " 用你自己的品牌对象生成产品照片"
        }, {
          "title": " \n            Pebblely        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/pebblely.png",
          "url": "https://pebblely.com/",
          "description": " 用AI在几秒钟内创建漂亮的产品照片"
        }, {
          "title": " \n            MakeLogoAI        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/makelogo.png",
          "url": "https://makelogo.ai/",
          "description": " 独特的标志，100%由人工智能生成"
        }, {
          "title": " \n            Hothot        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/hotpot.jpg",
          "url": "https://hotpot.ai/",
          "description": " 帮助你创建惊人的图形、图片和文本"
        }, {
          "title": " \n            Magician        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/magician.png",
          "url": "https://magician.design/",
          "description": " 一个由人工智能驱动的Figma的神奇设计工具"
        }, {
          "title": " \n            爱设计 PPT        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/06/isheji-ai-ppt.png",
          "url": "https://ppt.isheji.com/",
          "description": " AI 快速生成高质量 PPT"
        }
      ]
    },
    {
      'title': 'drawing',
      'id': 'drawing',
      'child': [
        {
          "title": " \n            PicWish        ",
          "url": "https://picwish.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2022/04/picwish.png",
          "description": "  一个多功能的图像创意平台"
        }, {
          "title": " \n            Stable Diffusion        ",
          "url": "https://stability.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/1679494097Stable-Diffusion.png",
          "description": " AI 绘画，输入关键字生成img"
        }, {
          "title": " \n            Civitai        ",
          "url": "https://civitai.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/civitai-icon-filled-36.png",
          "description": " 训练好的模型分享网站"
        }, {
          "title": " \n            文心一格        ",
          "url": "https://yige.baidu.com/creation",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/ppbaidu.png",
          "description": " 百度 AI 产品，创意和艺术辅助产品"
        }, {
          "title": " \n            Nijijourney        ",
          "url": "https://nijijourney.com/zh/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/niji-journey.png",
          "description": " 魔法般的二次元绘画生成"
        }, {
          "title": " \n            Midjourney        ",
          "url": "https://www.midjourney.com/home/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/midjourney.png",
          "description": " 是一款搭载在 Discord 上的人工智能绘画聊天工具"
        }, {
          "title": " \n            NightCafe Creator        ",
          "url": "https://creator.nightcafe.studio/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/night-cafe-1.png",
          "description": " AI艺术生成器"
        }, {
          "title": " \n            fotor        ",
          "url": "https://www.fotor.com/features/ai-image-generator/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/fotor.png",
          "description": " AI图像生成器"
        }, {
          "title": " \n            StarryAI        ",
          "url": "https://starryai.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/starry.png",
          "description": " AI艺术生成器应用程序"
        }, {
          "title": " \n            Hugging Face        ",
          "url": "https://huggingface.co/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/DistilBERT.png",
          "description": " 开源数据集和预训练模型"
        }, {
          "title": " \n            Adobe Firefly        ",
          "url": "https://firefly.adobe.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/adobe-firefly.jpg",
          "description": " 用Firefly做出无限的创作"
        }, {
          "title": " \n            Hothot        ",
          "url": "https://hotpot.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/hotpot.jpg",
          "description": " 帮助你创建惊人的图形、img和文本"
        }, {
          "title": " \n            HeadshotPro        ",
          "url": "https://www.headshotpro.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/headshotpro.png",
          "description": " 为远程团队提供专业的公司头像"
        }, {
          "title": " \n            Variart        ",
          "url": "https://variart.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/variart.jpg",
          "description": " 输入你想使用的img，即可生成一个没有任何版权限制的类似img"
        }, {
          "title": " \n            Scribble Diffusion        ",
          "url": "https://scribblediffusion.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/scribble.jpg",
          "description": " 使用AI将你的草图变成一个精致的图像"
        }, {
          "title": " \n            BoothAI        ",
          "url": "https://www.booth.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/booth.png",
          "description": " 用AI创建专业品质的产品摄影"
        }, {
          "title": " \n            Draw Things        ",
          "url": "https://drawthings.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/draw-things.png",
          "description": " AI辅助的图像生成"
        }, {
          "title": " \n            DiffusionBee        ",
          "url": "https://diffusionbee.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/DiffusionBee.jpg",
          "description": " 稳定的扩散应用于AI艺术"
        }, {
          "title": " \n            Glazeroom        ",
          "url": "https://glazeroom.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/glazeroom.png",
          "description": " 利用AI帮助艺术家更快地提供更好的艺术作品"
        }, {
          "title": " \n            Astria        ",
          "url": "https://www.astria.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/astria.png",
          "description": " 量身定制的AI图像生成"
        }, {
          "title": " \n            Lexica        ",
          "url": "https://lexica.art/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/lexica.png",
          "description": " 稳定扩散的搜索引擎"
        }, {
          "title": " \n            Erase BG        ",
          "url": "https://www.erase.bg/zh/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/erase-bg.png",
          "description": " 免费去背景软件"
        }, {
          "title": " \n            Clipdrop        ",
          "url": "https://clipdrop.co/tools",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Clipdrop.jpg",
          "description": " AI 技术处理图像的工具"
        }, {
          "title": " \n            Artbreeder        ",
          "url": "https://www.artbreeder.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Artbreeder.jpg",
          "description": " 创建令人惊叹的插画和艺术"
        }, {
          "title": " \n            dreamlike.art        ",
          "url": "https://dreamlike.art/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/dreamlike.jpg",
          "description": " 在几秒钟内创造出令人惊叹的原创艺术"
        }, {
          "title": " \n            getimg.ai        ",
          "url": "https://getimg.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/getimg.png",
          "description": " 创造出令人惊叹的头像"
        }, {
          "title": " \n            stockimg        ",
          "url": "https://stockimg.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/stockimg.jpg",
          "description": " 可帮助用户在几分钟内生成徽标、书籍封面、横幅等   "
        }, {
          "title": " \n            Profile Pic Maker        ",
          "url": "https://pfpmaker.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Profile-Pic-Maker.png",
          "description": " 一个在线的头像制作网站"
        }, {
          "title": " \n            Watermark Remover        ",
          "url": "https://www.watermarkremover.io/zh",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Watermark-Remover.png",
          "description": " 从图像中删除水印"
        }, {
          "title": " \n            ThisPersonDoesNotExist        ",
          "url": "https://www.thispersondoesnotexist.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/ThisPersonDoesNotExist.jpg",
          "description": " 生成一张不真实存在的人脸照片"
        }, {
          "title": " \n            Playground        ",
          "url": "https://playgroundai.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Playground.png",
          "description": " AI绘画网站"
        }, {
          "title": " \n            Shrink media        ",
          "url": "https://www.shrink.media/zh",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/shrink.png",
          "description": " 通过巧妙的压缩和降维来减小图像的文件大小，并免费下载压缩后的图像"
        }, {
          "title": " \n            Upscale.media        ",
          "url": "https://www.upscale.media/zh",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Upscale.png",
          "description": " 改变img的分辨率"
        }, {
          "title": " \n            photosonic        ",
          "url": "https://photosonic.writesonic.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/photosonic.png",
          "description": " 用AI创造独特的图像"
        }, {
          "title": " \n            Arthub.ai        ",
          "url": "https://arthub.ai/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/arthub.jpg",
          "description": " 发现、上传和分享人工智能生成的艺术"
        }, {
          "title": " \n            DreamStudio        ",
          "url": "https://beta.dreamstudio.ai/generate",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/dream-studio.png",
          "description": "  AI 图像生成器"
        }, {
          "title": " \n            无界AI        ",
          "url": "https://www.wujieai.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/wu-jie.png",
          "description": " 人人都是艺术家"
        }, {
          "title": " \n            Maze Guru        ",
          "url": "https://maze.guru/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Maze-Guru.jpg",
          "description": " 一个由 AI 驱动的 AI 绘画生成平台"
        }, {
          "title": " \n            Stable Diffusion Online        ",
          "url": "https://stablediffusionweb.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Stable-Diffusion-Online.jpg",
          "description": " 能够在任何文本输入的情况下生成照片般逼真的图像"
        }, {
          "title": " \n            Craiyon        ",
          "url": "http://https//www.craiyon.com",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Craiyon.jpg",
          "description": " 可以根据任意文本生成img的网站"
        }, {
          "title": " \n            Magic Eraser        ",
          "url": "https://www.magiceraser.io/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Magic-Eraser.png",
          "description": " 一款操作简单的在线P图网站"
        }, {
          "title": " \n            This Beach Does Not Exist        ",
          "url": "https://thisbeachdoesnotexist.com/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/this-beach-does-not.jpg",
          "description": " 基于人工智能的合成海滩发生器"
        }, {
          "title": " \n            Let’s Enhance        ",
          "url": "https://letsenhance.io/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Lets-Enhance.jpg",
          "description": " 一款简单易用的在线img无损放大工具"
        }, {
          "title": " \n            Generated Photos        ",
          "url": "https://generated.photos/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Generated-Photos.png",
          "description": " 是一个专门提供人像照片的网站"
        }, {
          "title": " \n            Imagen        ",
          "url": "https://imagen.research.google/",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Imagen.jpg",
          "description": " 文本到图像的扩散模型"
        }
      ]
    },
    {
      'title': 'model',
      'id': 'model',
      'child': [
        {
          "title": " \n            Codex        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/06/qmruasgh98rw6a4u4yop.webp",
          "url": "https://openai.com/blog/openai-codex",
          "description": " OpenAI 旗下 AI 代码生成训练模型，AI 系统可以将自然语言翻译成代码，"
        }, {
          "title": " \n            Imagen        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/06/imagen-1.jpg",
          "url": "https://imagen.research.google/",
          "description": " 文本到图像扩散模型"
        }, {
          "title": " \n            LLaMA        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/06/llama-1.png",
          "url": "https://github.com/facebookresearch/llama",
          "description": " 火焰模型推理代码"
        }, {
          "title": " \n            Lobe        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/06/lobe-1.png",
          "url": "https://www.lobe.ai/",
          "description": " 一个免费、易于使用的工具来训练机器学习模型"
        }, {
          "title": " \n            Scale        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/06/scale-2.jpg",
          "url": "https://scale.com/",
          "description": " 加快人工智能应用的发展"
        }, {
          "title": " \n            Evidently AI        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/06/evidently-1.png",
          "url": "https://www.evidentlyai.com/",
          "description": " 开源机器学习监控"
        }]
    },
    {
      'title': 'audio',
      'id': 'audio',
      'child': [
        {
          "title": " \n            Runway        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/runway.png",
          "url": "https://runwayml.com/",
          "description": " 由人工智能驱动的创意工具"
        }, {
          "title": " \n            Synthesia        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/Synthesia.jpg",
          "url": "https://www.synthesia.io/",
          "description": " 该平台提供了一个直观的界面，可以简化任何人的视频创作"
        }, {
          "title": " \n            LyricStudio        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/LyricStudio.png",
          "url": "https://lyricstudio.net/",
          "description": " 根据你的主题和风格建议独特的歌词创意"
        }, {
          "title": " \n            FakeYou        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/FakeYou.png",
          "url": "https://fakeyou.com/",
          "description": " 是一个文本到语音的仙境"
        }, {
          "title": " \n            Artflow        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Artflow.png",
          "url": "https://www.app.artflow.ai/",
          "description": " 使用人工智能生成的资产，创建自己独特的动画故事"
        }, {
          "title": " \n            Crypko        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Crypko.png",
          "url": "https://crypko.ai/cn/",
          "description": " 可以自动生成动漫人物，且可为动漫人物添加流畅的动画效果"
        }, {
          "title": " \n            Nova A.I.        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/nova.png",
          "url": "https://wearenova.ai/",
          "description": " 简单的在线视频编辑软件"
        }, {
          "title": " \n            Make-A-Video        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Make-A-Video.png",
          "url": "https://makeavideo.studio/",
          "description": " 根据文字提示生成高质量视频"
        }, {
          "title": " \n            Verw        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/verw.png",
          "url": "https://vrew.voyagerx.com/zh-TW/",
          "description": " 用AI语音识别自动上字幕"
        }, {
          "title": " \n            Descript        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/descript.png",
          "url": "https://www.descript.com/",
          "description": " 一个音视频编辑器"
        }, {
          "title": " \n            Uberduck        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Uberduck.png",
          "url": "https://uberduck.ai/",
          "description": " 开源语音AI社区"
        }, {
          "title": " \n            AIVA        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/AIVA.jpg",
          "url": "https://www.aiva.ai/",
          "description": " 人工智能谱写情感原声音乐"
        }, {
          "title": " \n            Supertone        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Supertone.jpg",
          "url": "https://supertone.ai/",
          "description": " 使用AI创作音乐、声音和其他声音"
        }, {
          "title": " \n            Jukebox        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/jukebox.jpg",
          "url": "https://openai.com/research/jukebox",
          "description": " 是OpenAI的一款AI音乐生成器"
        }, {
          "title": " \n            Altered        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Altered.png",
          "url": "https://www.altered.ai/",
          "description": " 是一款专业的 AI 变声软件"
        }, {
          "title": " \n            Unscreen        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Unscreen.jpg",
          "url": "https://www.unscreen.com/",
          "description": " 移除视频背景"
        }, {
          "title": " \n            Topaz video AI        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Topaz-video-AI.png",
          "url": "https://www.topazlabs.com/topaz-video-ai",
          "description": " 是一款人工智能视频无损放大软件,"
        }
      ]
    },
    {
      'title': 'working',
      'id': 'working',
      'child': [
        {
          "title": " \n            Tome AI        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/02/TOME.png",
          "url": "https://beta.tome.app/",
          "description": " 由AI驱动的讲故事形式"
        }, {
          "title": " \n            tiledesk        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/tiledesk.png",
          "url": "https://tiledesk.com/chatbot-design-studio/",
          "description": " 聊天机器人设计工作室"
        }, {
          "title": " \n            IngestAI        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/ingestai.jpg",
          "url": "https://ingestai.io/",
          "description": " 把你的知识库变成一个类似于ChatGPT的上下文感知机器人"
        }, {
          "title": " \n            Frase        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/03/frase.png",
          "url": "https://www.frase.io/",
          "description": " 研究、撰写和优化高质量的SEO内容"
        }, {
          "title": " \n            Mem.ai        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/mem.jpg",
          "url": "https://mem.ai/",
          "description": " 让 AI 组织您团队的工作"
        }, {
          "title": " \n            Resume Worded        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/resume-worded.png",
          "url": "https://resumeworded.com/index.php",
          "description": " 是一个在线简历改进工具"
        }, {
          "title": " \n            ChatExcel        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/chatexcel.png",
          "url": "https://chatexcel.com/",
          "description": " 仅通过聊天来操控您的Excel表格"
        }, {
          "title": " \n            Todoist        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/todoist.png",
          "url": "https://todoist.com/zh-CN",
          "description": " 管理您的工作和生活"
        }, {
          "title": " \n            ChatBCG        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/chatbcg.png",
          "url": "https://www.chatbcg.com/",
          "description": " 一个通过AI生成PPT的工具"
        }, {
          "title": " \n            Poised        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Poised.jpg",
          "url": "https://www.poised.com/",
          "description": " 是一个 AI 支持的沟通教练，通过观察用户在线上会议中的表现，为用户提供个性化的沟通课程和改进反馈"
        }, {
          "title": " \n            TLDR this        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/TLDR-this.png",
          "url": "https://tldrthis.com/",
          "description": " 是一个免费的在线文本摘要工具"
        }, {
          "title": " \n            Iris.ai        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Iris.png",
          "url": "https://ted.iris.ai/",
          "description": " 您的科学助理"
        }, {
          "title": " \n            wizdom.ai        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/wizdom.jpg",
          "url": "https://www.wizdom.ai/",
          "description": " 是一个自然语言处理平台，帮助人们通过理解和从数据中提取见解来做出更好的决策"
        }, {
          "title": " \n            Simpread        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/simpread.png",
          "url": "https://ksria.com/simpread/",
          "description": "  如杂志般沉浸式阅读体验的扩展"
        }, {
          "title": " \n            Semantic Scholar        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/Semantic-Scholar.png",
          "url": "https://www.semanticscholar.org/",
          "description": " 人工智能驱动的研究工具"
        }, {
          "title": " \n            Elicit        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/elicit.png",
          "url": "https://elicit.org/",
          "description": " 使用机器学习来帮助您进行研究"
        }, {
          "title": " \n            Bardeen        ",
          "img": "https://tools.haiyong.site/wp-content/uploads/2023/04/bardeen.png",
          "url": "https://www.bardeen.ai/",
          "description": " 引入突破性的 AI 来自动化手动工作流程，节省您的时间并激发您的创造力。"
        }
      ]
    }
  ],
}
const MSG = ref('')
const TYPE = ref('')
const RESULT = ref('此处显示翻译结果')
const options = [
  {
    value: '1',
    label: '中-英',
  },
  {
    value: '2',
    label: '英-中'
  },
  {
    value: '3',
    label: '自动'
  }
]
const translate = async () => {
  const res = await getInstance({msg: MSG.value, type: TYPE.value})
  RESULT.value = res.data.text
}


</script>
<template>
  <var-tabs elevation v-model:active="active" :safe-area="true">
    <var-tab name="ai">ai</var-tab>
    <var-tab name="translate">翻译</var-tab>
    <var-tab name="document">文档</var-tab>
  </var-tabs>
  <var-tabs-items v-model:active="active">
    <var-tab-item name="ai">
      <template #default>
        <ul v-for="ai in toolsData.ai" class="tab">
          <li class="nav-tab">{{ ai.title }}</li>
          <br>
          <li v-for="child in ai.child" class="tab-item">
            <el-link :href="child.url" target="_blank">

              <el-card style="width: 140px;height: 200px" shadow="hover">
                <div style="text-align: center;">
                  <el-image :src="child.img" style="width: 50px" lazy="lazy"></el-image>
                  <div style="padding: 14px">
                    <span style="font-weight: bolder ">{{ child.title }}</span>
                    <div class="bottom">
                      <p>{{ child.description }}</p>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-link>
          </li>
          <br>
        </ul>
      </template>
    </var-tab-item>
    <var-tab-item name="translate">
      <div style="text-align: center;">
      <el-select v-model="TYPE" class="m-2" placeholder="Select"  style="width: 100px">
        <el-option v-for="i in options" :key="i.value" :label="i.label" :value="i.value"/>
      </el-select>
      <el-input v-model="MSG" placeholder="请输入你要翻译的单词或句子" style="width: 200px"></el-input>
      <el-button @click="translate">翻译</el-button>
      <br>
      <textarea name="" id="" cols="52" rows="10" v-model="RESULT"></textarea>
      </div>

    </var-tab-item>
    <var-tab-item name="document">


    </var-tab-item>
  </var-tabs-items>
</template>

<style scoped>
.tab {
  text-decoration: none;
  float: left;
}

.tab .tab-item {
  display: flex;
  float: left;
  margin: 20px;
}

.nav-tab {
  float: left;
  list-style: none;
}
</style>