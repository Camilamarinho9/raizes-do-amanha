document.addEventListener("DOMContentLoaded", () => {

    // ===== MENU DE ACESSIBILIDADE (HAMBÚRGUER) =====
    const btnConfig  = document.getElementById("btn-config");
    const configMenu = document.getElementById("config-menu");
    const radioDark  = document.getElementById("radio-dark");
    const radioLight = document.getElementById("radio-light");

    // Abre e fecha o menu ao clicar no botão
    btnConfig.addEventListener("click", (e) => {
        e.stopPropagation();
        configMenu.classList.toggle("config-hidden");
    });
    // Fecha ao clicar fora do menu
    document.addEventListener("click", (e) => {
        if (!configMenu.contains(e.target) && e.target !== btnConfig) {
            configMenu.classList.add("config-hidden");
        }
    });

    // Alterna entre modo escuro e claro
    function setTema(tema) {
        if (tema === "claro") {
            document.body.classList.add("claro");
            radioLight.classList.add("ativo");
            radioDark.classList.remove("ativo");
        } else {
            document.body.classList.remove("claro");
            radioDark.classList.add("ativo");
            radioLight.classList.remove("ativo");
        }
        sessionStorage.setItem("tema", tema);
    }
    setTema(sessionStorage.getItem("tema") || "escuro");

    document.getElementById("opt-dark").addEventListener("click",  () => setTema("escuro"));
    document.getElementById("opt-light").addEventListener("click", () => setTema("claro"));

    // Controla o tamanho da fonte: A+ aumenta, A- diminui
    const tamanhos   = [80, 90, 100, 110, 120, 130];
    let indFonte     = 2; // começa em 100%
    const fonteLabel = document.getElementById("fonte-label");

    function aplicarFonte() {
        document.documentElement.style.fontSize = tamanhos[indFonte] + "%";
        fonteLabel.textContent = tamanhos[indFonte] + "%";
        document.getElementById("btn-fonte-menos").disabled = (indFonte === 0);
        document.getElementById("btn-fonte-mais").disabled  = (indFonte === tamanhos.length - 1);
    }
    document.getElementById("btn-fonte-mais").addEventListener("click",  () => { if (indFonte < tamanhos.length - 1) { indFonte++; aplicarFonte(); } });
    document.getElementById("btn-fonte-menos").addEventListener("click", () => { if (indFonte > 0) { indFonte--; aplicarFonte(); } });


    let ultimaRolagem = window.scrollY;
    const navbar = document.querySelector("nav");

    // ===== INDICADOR DE SEÇÃO ATIVA NA NAVBAR =====
    const secoes = ["inicio","introducao","sustentabilidade","tecnologia","natureza","curiosidade","quiz","contato"];
    const linksNavAtivo = document.querySelectorAll("nav .nav-links a");

    function atualizarNavAtiva() {
        let atual = "";
        secoes.forEach(id => {
            const el = document.getElementById(id);
            if (el && window.scrollY >= el.offsetTop - 100) atual = id;
        });
        linksNavAtivo.forEach(link => {
            const href = link.getAttribute("href").replace("#","");
            link.classList.toggle("nav-ativa", href === atual);
        });
    }
    window.addEventListener("scroll", atualizarNavAtiva);
    atualizarNavAtiva();

    // ===== IDIOMA ATIVO — CONTORNO VERDE =====
    function atualizarIdiomaAtivo() {
        ["pt","en","es"].forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.classList.toggle("idioma-ativo", id === idiomaAtual);
        });
    }

    // 1. Monitora a rolagem da tela
    window.addEventListener("scroll", () => {
        const rolagemAtual = window.scrollY;

        // Se rolar para baixo e passar o tamanho da navbar (80px), esconde
        if (rolagemAtual > ultimaRolagem && rolagemAtual > 80) {
            navbar.classList.add("nav-escondida");
        } 
        // Se rolar para cima, traz a barra de volta
        else {
            navbar.classList.remove("nav-escondida");
        }

        ultimaRolagem = rolagemAtual;
    });

    // 2. Monitora o mouse: se chegar a menos de 20px do topo da tela, força a barra a aparecer
    window.addEventListener("mousemove", (evento) => {
        if (evento.clientY <= 20) {
            navbar.classList.remove("nav-escondida");
        }
    });

    // ===== FADE IN ANIMATION (Intersection Observer) =====
    // Observa cada elemento com classe .fade e adiciona a classe .mostrar quando ele entra na tela
    const fades = document.querySelectorAll('.fade');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('mostrar');
            }
        });
    }, { threshold: 0.15 });

    fades.forEach(fade => observer.observe(fade));

    // ===== SISTEMA DE IDIOMAS (PT / EN / ES) =====
    // Variável que armazena o idioma atual selecionado pelo usuário
    let idiomaAtual = "pt";

    // Banco de textos traduzidos para os três idiomas
    const textos = {
        pt: {
            nav: ["Início", "Introdução", "Sustentabilidade", "Tecnologia", "Natureza", "Curiosidade", "Quiz"],
            slogan: "Equilíbrio entre produção e meio ambiente",
            saiba: "Saiba Mais",
            btnEmbrapa: "🌿 Saiba mais: Embrapa",
            introTitulo: "Bem-vindo",
            intro1: "O campo brasileiro é uma das maiores forças econômicas e sociais do planeta, sendo responsável direto por garantir a segurança alimentar de bilhões de pessoas globalmente. Longe de ser um setor estático, o ambiente rural moderno reúne a sabedoria das tradições familiares e a complexidade da gestão ambiental.",
            intro2: "No estado do Paraná, o cooperativismo e a pequena agricultura familiar dão um show de organização, mostrando de forma clara que o desenvolvimento econômico do país nasce da força da terra, quando ela é trabalhada com dedicação, técnica e respeito dia após dia.",
            intro3: "Produzir com consciência e proteger ativamente os ecossistemas nativos não é mais uma escolha opcional, mas sim o maior desafio técnico da nossa geração e a única esperança real para garantir um amanhã próspero.",
            sustTitulo: "Sustentabilidade no Campo",
            sust1: "A verdadeira sustentabilidade na agricultura corresponde à aplicação de práticas de manejo inteligente do solo. Um grande exemplo é o Sistema de Plantio Direto, técnica revolucionária que protege a terra contra processos erosivos ao manter a palhada da colheita anterior sobre o chão.",
            sust2: "Além disso, métodos eficientes como a rotação planejada de culturas e o manejo integrado de pragas combatem o esgotamento dos nutrientes do solo. Isso reduz significativamente a dependência de insumos artificiais e protege as bacias hidrográficas locais.",
            sust3: "Compreender com clareza que as florestas nativas em pé e as fontes de água limpa são os maiores patrimônios do produtor rural é o que define a verdadeira evolução do agronegócio moderno.",
            tecTitulo: "Tecnologia no Agro",
            tec1: "O agronegócio contemporâneo utiliza a tecnologia digital para alcançar o ápice da eficiência, produzindo volumes muito maiores com um desperdício de recursos drasticamente menor. É a chamada agricultura de precisão.",
            tec2: "Sensores acoplados ao solo, drones de mapeamento multiespectral e tratores guiados por GPS avançado permitem que os produtores monitorem a saúde exata de cada hectare, aplicando água e nutrientes apenas onde é realmente necessário.",
            tec3: "Essa transformação digital prova que a tecnologia de ponta e o amor tradicional pela terra não são opostos, mas sim parceiros perfeitos na construção de uma produção inteligente.",
            natTitulo: "Natureza e Equilíbrio",
            nat1: "Recursos vitais como água potável em abundância, solo biologicamente fértil e a rica biodiversidade local são as engrenagens invisíveis que sustentam toda a atividade agrícola do nosso país.",
            nat2: "Proteger as Matas Ciliares nas margens dos rios e manter corredores ecológicos preservados serve para garantir que polinizadores naturais, como as abelhas, continuem atuando diretamente na produtividade das lavouras.",
            nat3: "Manter o ecossistema em perfeito equilíbrio é a única garantia real de que teremos um solo produtivo e um clima estável para as próximas gerações.",
            curTitulo: "🌱 Você Sabia?",
            curBotao: "Mostrar Outra Curiosidade",
            quizTitulo: "Quiz do Agro",
            prox: "Próxima Pergunta",
            retry: "Tentar Novamente",
            fim: "Quiz Finalizado 🌱",
            puladas: "Perguntas puladas",
            contatoTitulo: "Deixe seu Feedback",
            labelNome: "Nome",
            placeholderNome: "Seu nome completo",
            labelEmail: "E-mail",
            placeholderEmail: "seu@email.com",
            labelMensagem: "Mensagem",
            placeholderMensagem: "Escreva sua mensagem...",
            btnEnviar: "Enviar",
            erroCampos: "⚠️ Por favor, preencha todos os campos!",
            erroEmail: "⚠️ Digite um e-mail válido! (ex: nome@email.com)",
            sucesso: "✅ Obrigado pelo feedback, ",
            acertos: "Acertos",
            puladas_label: "Puladas",
            menuTema: "// TEMA",
            menuEscuro: "Modo Escuro",
            menuClaro: "Modo Claro",
            menuFonte: "// FONTE",
            contatoTitulo: "Deixe seu Feedback",
            labelNome: "Nome",
            placeholderNome: "Seu nome completo",
            labelEmail: "E-mail",
            placeholderEmail: "seu@email.com",
            labelMensagem: "Mensagem",
            placeholderMensagem: "Escreva sua mensagem...",
            btnEnviar: "Enviar",
            erroCampos: "⚠️ Por favor, preencha todos os campos!",
            erroEmail: "⚠️ Digite um e-mail válido! (ex: nome@email.com)",
            sucesso: "✅ Obrigado pelo feedback, ",
            ranks: [
                "🌱 Autoridade Rural", "🌾 Agricultor Iniciante", "🚜 Aprendiz do Campo", 
                "🌿 Guardião Verde", "🌻 Cultivador Consciente", "🌎 Protetor da Natureza", 
                "⭐ Especialista Sustentável", "👑 Mestre do Agro"
            ],
            jogos: {
                0: "🌿 Alerta de perigo! Os recursos estão escassos e o terreno está hostil. Combine uma erva verde, reorganize seu inventário e tente sobreviver de novo.",
                1: "🪓 Garoto! Sua jornada pelo conhecimento apenas começou. O campo exige disciplina e paciência. Reúna suas forças, foque nos objetivos e tente novamente.",
                2: "🛡️ É perigoso ir sozinho! Pegue isto: uma dose extra de estudos sobre o ecossistema. Sua jornada para salvar o amanhã precisa de preparo.",
                3: "🦋 Cada ação gera consequências... Esta linha do tempo mostra que você tem boa intuição, mas suas escolhas futuras podem melhorar o amanhã.",
                4: "🍄 Mama mia! Você pegou um Super Cogumelo e expandiu seu conhecimento, mas sua pontuação ainda está em outro castelo. Continue avançando!",
                5: "⛏️ Excelente construção! Você está craftando um ecossistema sólido bloco por bloco. Seu conhecimento é tão resistente quanto a obsidiana.",
                6: "👑 Perfeição Alcançada! Sua fazenda foi avaliada com as 4 velas do Vovô. Você alcançou a harmonia absoluta entre produção e natureza!",
                7: "👑 Perfeição Máxima! Mestre absoluto do campo. Nenhuma pergunta foi pareia para sua sabedoria ecológica!"
            }
        },
        en: {
            nav: ["Home", "Introduction", "Sustainability", "Technology", "Nature", "Curiosity", "Quiz"],
            slogan: "Balance between production and environment",
            saiba: "Learn More",
            btnEmbrapa: "🌿 Learn more: Embrapa",
            introTitulo: "Welcome",
            intro1: "The Brazilian countryside is one of the greatest economic and social forces on the planet, being directly responsible for guaranteeing the food security of billions of people globally. Far from being a static sector, the modern rural environment combines the wisdom of family traditions with the complexity of environmental management.",
            intro2: "In the state of Paraná, cooperativism and small family farming put on a show of organization, clearly demonstrating that the country's economic development is born from the strength of the land, when it is worked with dedication, technique and respect day after day.",
            intro3: "Producing consciously and actively protecting native ecosystems is no longer an optional choice, but rather the greatest technical challenge of our generation and the only real hope to guarantee a prosperous tomorrow.",
            sustTitulo: "Sustainability in the Field",
            sust1: "True sustainability in agriculture corresponds to the application of smart soil management practices. A great example is the No-Till Farming System, a revolutionary technique that protects the land against erosive processes by keeping the residue from the previous harvest on the ground.",
            sust2: "In addition, efficient methods such as planned crop rotation and integrated pest management combat soil nutrient depletion. This significantly reduces dependence on artificial inputs and protects local watersheds.",
            sust3: "Clearly understanding that standing native forests and clean water sources are the farmer's greatest assets is what defines the true evolution of modern agribusiness.",
            tecTitulo: "Technology in Agro",
            tec1: "Contemporary agribusiness uses digital technology to reach the pinnacle of efficiency, producing much larger volumes with drastically less resource waste. This is what is called precision agriculture.",
            tec2: "Soil-coupled sensors, multispectral mapping drones and tractors guided by advanced GPS allow producers to monitor the exact health of each hectare, applying water and nutrients only where it is truly necessary.",
            tec3: "This digital transformation proves that cutting-edge technology and traditional love for the land are not opposites, but rather perfect partners in building intelligent production.",
            natTitulo: "Nature and Balance",
            nat1: "Vital resources such as abundant clean water, biologically fertile soil and rich local biodiversity are the invisible gears that sustain all agricultural activity in our country.",
            nat2: "Protecting Riparian Forests on riverbanks and maintaining preserved ecological corridors ensures that natural pollinators, such as bees, continue to act directly on crop productivity.",
            nat3: "Keeping the ecosystem in perfect balance is the only real guarantee that we will have productive soil and a stable climate for future generations.",
            curTitulo: "🌱 Did You Know?",
            curBotao: "Show Another Fact",
            quizTitulo: "Agro Quiz",
            prox: "Next Question",
            retry: "Try Again",
            fim: "Quiz Finished 🌱",
            puladas: "Skipped Questions",
            contatoTitulo: "Leave your Feedback",
            labelNome: "Name",
            placeholderNome: "Your full name",
            labelEmail: "E-mail",
            placeholderEmail: "your@email.com",
            labelMensagem: "Message",
            placeholderMensagem: "Write your message...",
            btnEnviar: "Send",
            erroCampos: "⚠️ Please fill in all fields!",
            erroEmail: "⚠️ Enter a valid e-mail! (ex: name@email.com)",
            sucesso: "✅ Thank you for your feedback, ",
            acertos: "Score",
            puladas_label: "Skipped",
            menuTema: "// THEME",
            menuEscuro: "Dark Mode",
            menuClaro: "Light Mode",
            menuFonte: "// FONT",
            contatoTitulo: "Leave your Feedback",
            labelNome: "Name",
            placeholderNome: "Your full name",
            labelEmail: "E-mail",
            placeholderEmail: "your@email.com",
            labelMensagem: "Message",
            placeholderMensagem: "Write your message...",
            btnEnviar: "Send",
            erroCampos: "⚠️ Please fill in all fields!",
            erroEmail: "⚠️ Enter a valid e-mail! (ex: name@email.com)",
            sucesso: "✅ Thank you for your feedback, ",
            ranks: [
                "🌱 Rural Explorer", "🌾 Beginner Farmer", "🚜 Field Apprentice", 
                "🌿 Green Guardian", "🌻 Conscious Cultivator", "🌎 Nature Protector", 
                "⭐ Sustainable Specialist", "👑 Agro Master"
            ],
            jogos: {
                0: "🌿 Danger alert! Resources are scarce, and the terrain is hostile. Combine a green herb, reorganize your inventory, and try to survive again.",
                1: "🪓 Boy! Your journey through knowledge has just begun. The field demands discipline and patience. Gather your strength, focus on your goals, and try again.",
                2: "🛡️ It's dangerous to go alone! Take this: an extra dose of ecosystem studies. Your journey to save tomorrow needs preparation.",
                3: "🦋 Every action has consequences... This timeline shows you have good intuition, but your choices can improve tomorrow.",
                4: "🍄 Mama mia! You got a Super Mushroom, but your score is in another castle. Keep moving forward!",
                5: "⛏️ Excellent build! You are crafting a solid ecosystem block by block. Your knowledge is as tough as obsidian.",
                6: "👑 Perfection Achieved! Your farm was evaluated with Grandpa's 4 candles. Absolute harmony!",
                7: "👑 Ultimate Perfection! Absolute master of the fields. No question could stand in your way!"
            }
        },
        es: {
            nav: ["Inicio", "Introducción", "Sostenibilidad", "Tecnología", "Naturaleza", "Curiosidad", "Quiz"],
            slogan: "Equilibrio entre producción y medio ambiente",
            saiba: "Saber Más",
            btnEmbrapa: "🌿 Saber más: Embrapa",
            introTitulo: "Bienvenido",
            intro1: "El campo brasileño es una de las mayores fuerzas económicas y sociales del planeta, siendo directamente responsable de garantizar la seguridad alimentaria de miles de millones de personas a nivel mundial. Lejos de ser un sector estático, el ambiente rural moderno reúne la sabiduría de las tradiciones familiares con la complejidad de la gestión ambiental.",
            intro2: "En el estado de Paraná, el cooperativismo y la pequeña agricultura familiar dan una muestra de organización, demostrando claramente que el desarrollo económico del país nace de la fuerza de la tierra, cuando se trabaja con dedicación, técnica y respeto día tras día.",
            intro3: "Producir con conciencia y proteger activamente los ecosistemas nativos ya no es una elección opcional, sino el mayor desafío técnico de nuestra generación y la única esperanza real para garantizar un mañana próspero.",
            sustTitulo: "Sostenibilidad en el Campo",
            sust1: "La verdadera sostenibilidad en la agricultura corresponde a la aplicación de prácticas de manejo inteligente del suelo. Un gran ejemplo es el Sistema de Siembra Directa, una técnica revolucionaria que protege la tierra contra los procesos erosivos al mantener la paja de la cosecha anterior sobre el suelo.",
            sust2: "Además, métodos eficientes como la rotación planificada de cultivos y el manejo integrado de plagas combaten el agotamiento de los nutrientes del suelo. Esto reduce significativamente la dependencia de insumos artificiales y protege las cuencas hidrográficas locales.",
            sust3: "Comprender claramente que los bosques nativos en pie y las fuentes de agua limpia son el mayor patrimonio del productor rural es lo que define la verdadera evolución del agronegocio moderno.",
            tecTitulo: "Tecnología en el Agro",
            tec1: "El agronegocio contemporáneo utiliza la tecnología digital para alcanzar el punto máximo de eficiencia, produciendo volúmenes mucho mayores con un desperdicio de recursos drásticamente menor. Es lo que se llama agricultura de precisión.",
            tec2: "Sensores acoplados al suelo, drones de mapeo multiespectral y tractores guiados por GPS avanzado permiten a los productores monitorear la salud exacta de cada hectárea, aplicando agua y nutrientes solo donde es realmente necesario.",
            tec3: "Esta transformación digital demuestra que la tecnología de vanguardia y el amor tradicional por la tierra no son opuestos, sino socios perfectos en la construcción de una producción inteligente.",
            natTitulo: "Naturaleza y Equilibrio",
            nat1: "Recursos vitales como el agua potable en abundancia, un suelo biológicamente fértil y la rica biodiversidad local son los engranajes invisibles que sostienen toda la actividad agrícola de nuestro país.",
            nat2: "Proteger los Bosques Ribereños en las márgenes de los ríos y mantener corredores ecológicos preservados garantiza que los polinizadores naturales, como las abejas, continúen actuando directamente en la productividad de los cultivos.",
            nat3: "Mantener el ecosistema en perfecto equilibrio es la única garantía real de que tendremos un suelo productivo y un clima estable para las próximas generaciones.",
            curTitulo: "🌱 ¿Sabías?",
            curBotao: "Mostrar Otra Curiosidad",
            quizTitulo: "Quiz Agro",
            prox: "Siguiente Pregunta",
            retry: "Intentar Otra Vez",
            fim: "Quiz Finalizado 🌱",
            puladas: "Preguntas saltadas",
            contatoTitulo: "Deja tu Feedback",
            labelNome: "Nombre",
            placeholderNome: "Tu nombre completo",
            labelEmail: "Correo",
            placeholderEmail: "tu@correo.com",
            labelMensagem: "Mensaje",
            placeholderMensagem: "Escribe tu mensaje...",
            btnEnviar: "Enviar",
            erroCampos: "⚠️ ¡Por favor, completa todos los campos!",
            erroEmail: "⚠️ ¡Ingresa un correo válido! (ej: nombre@correo.com)",
            sucesso: "✅ ¡Gracias por tu feedback, ",
            acertos: "Aciertos",
            puladas_label: "Saltadas",
            menuTema: "// TEMA",
            menuEscuro: "Modo Oscuro",
            menuClaro: "Modo Claro",
            menuFonte: "// FUENTE",
            contatoTitulo: "Deja tu Feedback",
            labelNome: "Nombre",
            placeholderNome: "Tu nombre completo",
            labelEmail: "Correo",
            placeholderEmail: "tu@correo.com",
            labelMensagem: "Mensaje",
            placeholderMensagem: "Escribe tu mensaje...",
            btnEnviar: "Enviar",
            erroCampos: "⚠️ ¡Por favor, completa todos los campos!",
            erroEmail: "⚠️ ¡Ingresa un correo válido! (ej: nombre@correo.com)",
            sucesso: "✅ ¡Gracias por tu feedback, ",
            ranks: [
                "🌱 Explorador Rural", "🌾 Agricultor Principiante", "🚜 Aprendiz del Campo", 
                "🌿 Guardián Verde", "🌻 Cultivador Consciente", "🌎 Protector de la Naturaleza", 
                "⭐ Especialista Sostenible", "👑 Maestro del Agro"
            ],
            jogos: {
                0: "🌿 ¡Alerta de peligro! Los recursos escasean y el terreno es hostil. Combina una hierba verde, reorganiza tu inventario e intenta sobrevivir.",
                1: "🪓 ¡Muchacho! Tu viaje por el conocimiento acaba de comenzar. El campo exige disciplina y paciencia. Reúne tus fuerzas e inténtalo de nuevo.",
                2: "🛡️ ¡Es peligroso ir solo! Toma esto: una dosis extra de estudios. Tu viaje para salvar el mañana necesita un poco más de preparación.",
                3: "🦋 Cada acción tiene consecuencias... Esta línea del tiempo muestra buena intuición, pero tus elecciones futuras pueden mejorar el mañana.",
                4: "🍄 ¡Mama mia! Conseguiste un Súper Champiñón, pero tu puntuación está en otro castillo. ¡Sigue adelante!",
                5: "⛏️ ¡Excelente construcción! Estás crafteando un ecosistema sólido bloco por bloco. Tu conocimiento es resistente como la obsidiana.",
                6: "👑 ¡Perfección Alcanzada! Tu granja fue evaluada con las 4 velas del Abuelo. Armonía absoluta entre producción y naturaleza.",
                7: "👑 ¡Perfección Máxima! Maestro absoluto del campo. ¡Ninguna pregunta pudo detener tu sabiduría ecológica!"
            }
        }
    };

    // ===== BANCO DE CURIOSIDADES =====
    // Cada idioma tem 5 curiosidades que rotacionam ao clicar no botão
    const curiosidades = {
        pt: [
            "🐝 As abelhas e outros polinizadores são responsáveis pela reprodução de mais de 75% das espécies de plantas cultivadas na agricultura.",
            "💧 Sistemas de irrigação gota a gota controlados por sensores inteligentes reduzem o consumo de água na lavoura em até 60%.",
            "🌱 O Sistema de Plantio Direto evita a emissão de gases poluentes e mantém a umidade natural da terra por muito mais tempo.",
            "🚜 Drones agrícolas equipados com câmeras térmicas conseguem identificar focos de pragas antes mesmo que eles fiquem visíveis ao olho humano.",
            "🌳 A preservação das matas ciliares reduz em até 90% o assoreamento dos rios, mantendo a água limpa para a região.",
            "🌾 O Brasil é o maior exportador mundial de soja, café, açúcar e suco de laranja, alimentando mais de 800 milhões de pessoas.",
            "☀️ A energia solar já abastece mais de 100 mil propriedades rurais no Brasil, reduzindo custos e emissões de carbono no campo.",
            "🌍 O desperdício alimentar global equivale a desperdiçar toda a água usada para produzir esses alimentos — um recurso cada vez mais escasso.",
            "🧬 Técnicas de melhoramento genético permitem criar variedades de plantas resistentes à seca, reduzindo perdas em anos de estiagem.",
            "🐄 O Brasil tem mais de 220 milhões de cabeças de gado — o maior rebanho bovino comercial do planeta.",
            "🌿 A integração Lavoura-Pecuária-Floresta (ILPF) pode aumentar a produtividade em até 30% e ainda recuperar solos degradados.",
            "🔬 Sensores de solo conectados à internet monitoram temperatura, umidade e pH em tempo real, otimizando a aplicação de insumos.",
            "🌊 Apenas 3% da água do planeta é doce — e mais de dois terços dessa reserva estão congelados nas calotas polares.",
            "🏭 O agronegócio representa cerca de 27% do PIB brasileiro, sendo essencial para a economia e segurança alimentar do país.",
            "🦋 A biodiversidade de insetos nos campos reduz naturalmente a proliferação de pragas, diminuindo a necessidade de agrotóxicos."
        ],
        en: [
            "🐝 Bees and other natural pollinators support the lifecycle of over 75% of global food crop species.",
            "💧 Smart drip irrigation systems utilizing soil sensors cut crop water consumption by up to 60%.",
            "🌱 No-till farming mechanisms actively lower carbon footprint and retain natural soil moisture effectively.",
            "🚜 Agricultural drones with thermal lenses pinpoint pest outbreaks before they are visible to the naked human eye.",
            "🌳 Protecting riverside forests reduces river siltation by up to 90%, preserving local water baselines.",
            "🌾 Brazil is the world's largest exporter of soybeans, coffee, sugar and orange juice, feeding over 800 million people.",
            "☀️ Solar energy already powers over 100,000 rural properties in Brazil, cutting costs and carbon emissions on the farm.",
            "🌍 Global food waste is equivalent to wasting all the water used to produce that food — an increasingly scarce resource.",
            "🧬 Genetic improvement techniques allow the creation of drought-resistant plant varieties, reducing losses in dry years.",
            "🐄 Brazil has over 220 million head of cattle — the largest commercial bovine herd on the planet.",
            "🌿 The Crop-Livestock-Forest Integration (CLFI) system can boost productivity by up to 30% while recovering degraded soils.",
            "🔬 Internet-connected soil sensors monitor temperature, humidity and pH in real time, optimizing input application.",
            "🌊 Only 3% of the planet's water is fresh — and over two-thirds of that reserve is frozen in the polar ice caps.",
            "🏭 Agribusiness accounts for about 27% of Brazil's GDP, being essential for the country's economy and food security.",
            "🦋 Insect biodiversity in fields naturally reduces pest proliferation, decreasing the need for pesticides."
        ],
        es: [
            "🐝 Las abejas y los polinizadores sostienen el ciclo de vida de más del 75% de las plantas cultivadas en el mundo.",
            "💧 Los sistemas de riego por goteo automatizados reducen el uso de agua en la agricultura hasta en un 60%.",
            "🌱 La siembra directa secuestra carbono en el suelo y retiene la humedad natural de la tierra eficientemente.",
            "🚜 Los drones equipados con sensores térmicos detectan plagas agrícolas antes de que sean visibles para el ojo humano.",
            "🌳 Preservar los bosques ribereños disminuye la sedimentación de los ríos en un 90%, protegiendo el suministro de agua.",
            "🌾 Brasil es el mayor exportador mundial de soja, café, azúcar y jugo de naranja, alimentando a más de 800 millones de personas.",
            "☀️ La energía solar ya abastece más de 100 mil propiedades rurales en Brasil, reduciendo costos y emisiones de carbono.",
            "🌍 El desperdicio alimentario global equivale a desperdiciar toda el agua usada para producir esos alimentos.",
            "🧬 Las técnicas de mejoramiento genético permiten crear variedades resistentes a la sequía, reduciendo pérdidas en años secos.",
            "🐄 Brasil tiene más de 220 millones de cabezas de ganado — el mayor hato bovino comercial del planeta.",
            "🌿 La integración Cultivo-Ganadería-Bosque puede aumentar la productividad hasta un 30% y recuperar suelos degradados.",
            "🔬 Sensores de suelo conectados a internet monitorizan temperatura, humedad y pH en tiempo real, optimizando insumos.",
            "🌊 Solo el 3% del agua del planeta es dulce — y más de dos tercios de esa reserva está congelada en los polos.",
            "🏭 El agronegocio representa cerca del 27% del PIB brasileño, siendo esencial para la economía y seguridad alimentaria.",
            "🦋 La biodiversidad de insectos en los campos reduce naturalmente las plagas, disminuyendo la necesidad de agroquímicos."
        ]
    };

    // Índice que controla qual curiosidade está sendo exibida no momento
    let indiceCuriosidade = 0;
    const textoCuriosidade = document.getElementById("texto-curiosidade");
    const btnCuriosidade = document.getElementById("btn-curiosidade");

    // Função que atualiza todos os textos da página no idioma selecionado
    function renderizarParagrafos() {
        const t = textos[idiomaAtual];
        
        document.getElementById("titulo-principal").textContent = "Raízes do Amanhã";
        document.getElementById("slogan").textContent = t.slogan;
        document.getElementById("btn-saiba").textContent = t.saiba;
        document.getElementById("intro-titulo").textContent = t.introTitulo;
        document.getElementById("sust-titulo").textContent = t.sustTitulo;
        document.getElementById("tec-titulo").textContent = t.tecTitulo;
        document.getElementById("nat-titulo").textContent = t.natTitulo;
        document.getElementById("curiosidade-titulo").textContent = t.curTitulo;
        document.getElementById("btn-curiosidade").textContent = t.curBotao;
        document.getElementById("quiz-titulo").textContent = t.quizTitulo;
        document.getElementById("proxima").textContent = t.prox;

        // Atualiza os links da navbar com o idioma correto
        const linksNav = document.querySelectorAll("nav .nav-links a");
        if(linksNav.length >= 7) {
            linksNav[0].textContent = t.nav[0];
            linksNav[1].textContent = t.nav[1];
            linksNav[2].textContent = t.nav[2];
            linksNav[3].textContent = t.nav[3];
            linksNav[4].textContent = t.nav[4];
            linksNav[5].textContent = t.nav[5];
            linksNav[6].textContent = t.nav[6];
        }

        // Atualiza os parágrafos de cada seção
        document.getElementById("intro-p1").textContent = t.intro1;
        document.getElementById("intro-p2").textContent = t.intro2;
        document.getElementById("intro-p3").textContent = t.intro3;
        
        document.getElementById("sust-p1").textContent = t.sust1;
        document.getElementById("sust-p2").textContent = t.sust2;
        document.getElementById("sust-p3").textContent = t.sust3;
        
        document.getElementById("tec-p1").textContent = t.tec1;
        document.getElementById("tec-p2").textContent = t.tec2;
        document.getElementById("tec-p3").textContent = t.tec3;
        
        document.getElementById("nat-p1").textContent = t.nat1;
        document.getElementById("nat-p2").textContent = t.nat2;
        document.getElementById("nat-p3").textContent = t.nat3;

        const btnEmbrapaEl = document.getElementById("btn-embrapa");
        if (btnEmbrapaEl) btnEmbrapaEl.textContent = t.btnEmbrapa;

        // Atualiza textos do formulário de contato
        const contatoTituloEl = document.getElementById("contato-titulo");
        if (contatoTituloEl) contatoTituloEl.textContent = t.contatoTitulo;

        const labelNomeEl = document.getElementById("label-nome");
        if (labelNomeEl) labelNomeEl.textContent = t.labelNome;

        const labelEmailEl = document.getElementById("label-email");
        if (labelEmailEl) labelEmailEl.textContent = t.labelEmail;

        const labelMensagemEl = document.getElementById("label-mensagem");
        if (labelMensagemEl) labelMensagemEl.textContent = t.labelMensagem;

        const campoNomeEl = document.getElementById("campo-nome");
        if (campoNomeEl) campoNomeEl.placeholder = t.placeholderNome;

        const campoEmailEl = document.getElementById("campo-email");
        if (campoEmailEl) campoEmailEl.placeholder = t.placeholderEmail;

        const campoMensagemEl = document.getElementById("campo-mensagem");
        if (campoMensagemEl) campoMensagemEl.placeholder = t.placeholderMensagem;

        const btnEnviarEl = document.getElementById("btn-enviar");
        if (btnEnviarEl) btnEnviarEl.textContent = t.btnEnviar;

        // Limpa mensagem de feedback ao trocar idioma
        const msgFeedbackEl = document.getElementById("msg-feedback");
        if (msgFeedbackEl) msgFeedbackEl.textContent = "";

        // Atualiza textos do menu hambúrguer
        const menuTemaEl = document.querySelector(".config-titulo:first-of-type");
        if (menuTemaEl) menuTemaEl.textContent = t.menuTema;

        const menuTitulos = document.querySelectorAll(".config-titulo");
        if (menuTitulos[0]) menuTitulos[0].textContent = t.menuTema;
        if (menuTitulos[1]) menuTitulos[1].textContent = t.menuFonte;

        const optDark = document.getElementById("opt-dark");
        if (optDark) optDark.childNodes.forEach(node => { if (node.nodeType === 3) node.textContent = " " + t.menuEscuro; });

        const optLight = document.getElementById("opt-light");
        if (optLight) optLight.childNodes.forEach(node => { if (node.nodeType === 3) node.textContent = " " + t.menuClaro; });
    }

    // Renderiza os textos na inicialização da página
    renderizarParagrafos();
    atualizarIdiomaAtivo();

    // Exibe a primeira curiosidade ao carregar a página
    if (textoCuriosidade) {
        textoCuriosidade.textContent = curiosidades[idiomaAtual][0];
    }

    // Ao clicar no botão, avança para a próxima curiosidade em loop
    if (btnCuriosidade) {
        btnCuriosidade.onclick = () => {
            indiceCuriosidade = (indiceCuriosidade + 1) % curiosidades[idiomaAtual].length;
            textoCuriosidade.textContent = curiosidades[idiomaAtual][indiceCuriosidade];
        };
    }

    // ===== BANCO DE PERGUNTAS DO QUIZ =====
    // Formato: ["Pergunta", ["Opção A", "Opção B", "Opção C", "Opção D"], índice_correto]
    const quizzes = {
        pt: [
            ["Qual é um dos principais objetivos do Sistema de Plantio Direto?", ["Aumentar o uso de arado", "Proteger o solo contra erosão", "Eliminar a palhada antiga", "Gastar mais água"], 1],
            ["Que tecnologia moderna ajuda no monitoramento preciso de pragas?", ["Aparelhos de Fax", "Sistemas de rádio antigos", "Tratamento manual", "Drones com câmeras térmicas"], 3],
            ["Qual a função ecológica das matas ciliares na agricultura?", ["Proteger os rios contra assoreamento", "Servir de estrada", "Aumentar a área de plantio", "Bloquear a luz do sol"], 0],
            ["Por que as abelhas são vitais para a produção de alimentos?", ["Produzem adubo", "Limpam as folhas secas", "Regulam a temperatura", "Realizam a polinização das culturas"], 3],
            ["A rotação de culturas serve principalmente para?", ["Mudar a cor da plantação", "Evitar o esgotamento do solo", "Acelerar a velocidade das máquinas", "Prever o clima"], 1],
            ["A agricultura de precisão ajuda o produtor a:", ["Gastar mais insumos", "Ignorar dados do satélite", "Economizar água e recursos aplicados", "Abandonar o maquinário"], 2],
            ["Como a tecnologia e a sustentabilidade interagem no campo?", ["A tecnologia destrói o solo", "Elas não funcionam juntas", "A sustentabilidade proíbe máquinas", "A tecnologia ajuda a preservar recursos"], 3]
        ],
        en: [
            ["What is the main goal of No-Till Farming?", ["Increase plow usage", "Protect soil from erosion", "Remove crop residues", "Waste more water"], 1],
            ["Which modern tech aids in precise pest monitoring?", ["Fax machines", "Old radio links", "Manual sweeping", "Drones with thermal cameras"], 3],
            ["What is the ecological purpose of riverside forests?", ["Protect rivers from siltation", "Act as rural roads", "Expand planting zones", "Block overhead sunlight"], 0],
            ["Why are bees vital for global agriculture?", ["They generate fertilizer", "They clean dried leaves", "They shift climate variables", "They cross-pollinate crops"], 3],
            ["Crop rotation mechanisms are implemented to:", ["Alter foliage colors", "Prevent soil depletion", "Boost machinery speeds", "Forecast rain schedules"], 1],
            ["Precision farming practices enable growers to:", ["Increase input waste", "Ignore satellite metrics", "Save applied water and resources", "Ditch mechanized units"], 2],
            ["How do technology and sustainability interface?", ["Tech degrades soil health", "They do not work together", "Sustainability bans machines", "Tech optimizes resource conservation"], 3]
        ],
        es: [
            ["¿Cuál es el fin principal de la Siembra Directa?", ["Arar más la tierra", "Proteger el suelo de la erosión", "Quemar restos vegetales", "Gastar más agua"], 1],
            ["¿Qué tecnología moderna ayuda a monitorear plagas?", ["Máquinas de fax", "Sistemas de radio antiguos", "Revisión manual", "Drones con cámaras térmicas"], 3],
            ["¿Qué función cumplen los bosques ribereños?", ["Proteger ríos de la sedimentación", "Servir como caminos", "Ampliar el área cultivable", "Bloquear la luz solar"], 0],
            ["¿Por qué las abejas son vitales en el campo?", ["Crean fertilizante", "Limpian hojas secas", "Controlan el viento", "Polinizan los cultivos agrícolas"], 3],
            ["La rotación de cultivos se utiliza para:", ["Cambiar el color de la finca", "Evitar el desgaste del suelo", "Acelerar los tractores", "Predecir tormentas"], 1],
            ["La agricultura de precisión permite al productor:", ["Desperdiciar insumos", "Ignorar satélites", "Ahorrar agua y recursos aplicados", "Abandonar maquinaria"], 2],
            ["¿Cómo se relacionan tecnología y sostenibilidad?", ["La tecnología daña el suelo", "No son compatibles", "La sostenibilidad prohíbe máquinas", "La tecnología optimiza la conservación"], 3]
        ]
    };

    // Variáveis de controle do estado do quiz
    let perguntaAtual = 0;  // Índice da pergunta sendo exibida
    let pontuacao = 0;      // Contador de acertos do usuário
    let puladas = 0;        // Contador de perguntas puladas sem resposta
    let respondeu = false;  // Impede que o usuário responda duas vezes a mesma pergunta

    const perguntaEl = document.getElementById("pergunta");
    const respostasEl = document.getElementById("respostas");
    const proximaBtn = document.getElementById("proxima");
    const resultadoEl = document.getElementById("resultado");

    // Função que retorna o título/rank do usuário com base na pontuação final
    function rank() {
        const listaRanks = textos[idiomaAtual].ranks;
        if (pontuacao >= listaRanks.length) return listaRanks[listaRanks.length - 1];
        return listaRanks[pontuacao];
    }

    // Função que carrega e exibe a pergunta atual com suas opções de resposta
    function carregarPergunta() {
        respondeu = false;
        if (resultadoEl) resultadoEl.textContent = "";
        const quiz = quizzes[idiomaAtual];

        if (perguntaEl) perguntaEl.textContent = quiz[perguntaAtual][0];
        if (respostasEl) {
            respostasEl.innerHTML = "";
            // Cria dinamicamente os botões de resposta para cada opção
            quiz[perguntaAtual][1].forEach((resp, index) => {
                const btn = document.createElement("button");
                btn.textContent = resp;

                btn.onclick = () => {
                    if (respondeu) return; // Bloqueia clique duplo
                    respondeu = true;
                    const indiceCorreto = quiz[perguntaAtual][2];

                    // Marca verde se correto, vermelho se errado
                    if (index === indiceCorreto) {
                        btn.style.background = "#00ff41";
                        btn.style.color = "black";
                        pontuacao++;
                    } else {
                        btn.style.background = "#ff4444";
                        const botoes = respostasEl.querySelectorAll("button");
                        botoes[indiceCorreto].style.background = "#00ff41";
                        botoes[indiceCorreto].style.color = "black";
                    }
                };
                respostasEl.appendChild(btn);
            });
        }
    }

    // Inicializa o quiz ao carregar a página
    if (perguntaEl && respostasEl) {
        carregarPergunta();
    }

    // Função que exibe a tela final do quiz com pontuação e rank do usuário
    function finalizarQuiz() {
        const t = textos[idiomaAtual];
        if (perguntaEl) perguntaEl.textContent = t.fim;
        if (respostasEl) respostasEl.innerHTML = "";
        
        // Seleciona a mensagem temática baseada na pontuação obtida
        const textoPersonagem = t.jogos[pontuacao] || t.jogos[6];

        if (resultadoEl) {
            resultadoEl.innerHTML = `
                <div class="resultado-card">
                    <p class="resultado-rank">${rank()}</p>
                    <p class="resultado-pontos">${t.acertos}: ${pontuacao} / ${quizzes[idiomaAtual].length} &nbsp;|&nbsp; ${t.puladas_label}: ${puladas}</p>
                    <p class="resultado-msg">${textoPersonagem}</p>
                </div>
            `;
        }
        if (proximaBtn) { proximaBtn.textContent = t.retry; proximaBtn.dataset.modo = "retry"; }
    }

    // Controla o botão de avançar pergunta ou reiniciar o quiz
    if (proximaBtn) {
        proximaBtn.onclick = () => {
            const t = textos[idiomaAtual];
            
            // Se o botão estiver no modo retry, reinicia tudo
            if (proximaBtn.dataset.modo === "retry") {
                perguntaAtual = 0;
                pontuacao = 0;
                puladas = 0;
                proximaBtn.textContent = t.prox;
                proximaBtn.dataset.modo = "prox";
                carregarPergunta();
                return;
            }

            // Contabiliza pergunta pulada se o usuário não respondeu
            if (!respondeu) puladas++;
            perguntaAtual++;

            // Verifica se ainda há perguntas ou finaliza o quiz
            if (perguntaAtual < quizzes[idiomaAtual].length) {
                carregarPergunta();
            } else {
                finalizarQuiz();
            }
        };
    }

    // ===== CONEXÃO DOS BOTÕES DE IDIOMA =====
    // Cada botão troca o idioma e atualiza toda a interface dinamicamente
    // Função centralizada para trocar idioma — corrige bugs de troca no quiz
    function trocarIdioma(novoIdioma) {
        idiomaAtual = novoIdioma;
        renderizarParagrafos();
        atualizarIdiomaAtivo();
        if (textoCuriosidade) textoCuriosidade.textContent = curiosidades[idiomaAtual][indiceCuriosidade];

        // Se o quiz está finalizado, re-renderiza o resultado no novo idioma
        if (proximaBtn && proximaBtn.dataset.modo === "retry") {
            finalizarQuiz();
        }
        // Se está no meio do quiz e não respondeu ainda, recarrega a pergunta no idioma novo
        else if (perguntaAtual < quizzes[idiomaAtual].length && !respondeu) {
            carregarPergunta();
        }
        // Se respondeu, atualiza só o botão próxima no novo idioma
        else if (perguntaAtual < quizzes[idiomaAtual].length && respondeu) {
            document.getElementById("proxima").textContent = textos[idiomaAtual].prox;
        }
    }

    document.getElementById("pt").onclick = () => trocarIdioma("pt");
    document.getElementById("en").onclick = () => trocarIdioma("en");
    document.getElementById("es").onclick = () => trocarIdioma("es");

    // ===== ANIMAÇÃO DE FUNDO (CANVAS) - CURIOSIDADE E QUIZ =====
    const boxCuriosidade = document.querySelector(".curiosidade-box");
    const boxQuiz = document.querySelector(".quiz-box");

    // Canvas da seção Curiosidade: exibe caracteres "?" caindo em estilo matrix
    if (boxCuriosidade) {
        boxCuriosidade.style.position = "relative";
        const cCur = document.createElement("canvas");
        cCur.style.position = "absolute";
        cCur.style.top = "0";
        cCur.style.left = "0";
        cCur.style.width = "100%";
        cCur.style.height = "100%";
        cCur.style.zIndex = "1";
        cCur.style.opacity = "0.08"; 
        cCur.style.pointerEvents = "none";
        boxCuriosidade.prepend(cCur);
        
        Array.from(boxCuriosidade.children).forEach(child => {
            if(child !== cCur) child.style.position = "relative"; child.style.zIndex = "2";
        });

        const ctxCur = cCur.getContext("2d");
        let colsCur = [];

        // Redimensiona o canvas ao mudar o tamanho da janela
        function resizeCur() { cCur.width = boxCuriosidade.clientWidth; cCur.height = boxCuriosidade.clientHeight; colsCur = Array(Math.floor(cCur.width / 20)).fill(1); }
        resizeCur();
        window.addEventListener("resize", resizeCur);

        // Desenha os caracteres "?" caindo na tela
        function drawCur() {
            ctxCur.clearRect(0, 0, cCur.width, cCur.height);
            ctxCur.fillStyle = "#00ff41";
            ctxCur.font = "15px Courier New, monospace";
            for (let i = 0; i < colsCur.length; i++) {
                ctxCur.fillText("?", i * 20, colsCur[i] * 20);
                if (colsCur[i] * 20 > cCur.height && Math.random() > 0.98) colsCur[i] = 0;
                colsCur[i]++;
            }
        }
        setInterval(drawCur, 60);
    }

    // Canvas do Quiz: exibe binário "01" caindo em estilo matrix
    if (boxQuiz) {
        boxQuiz.style.position = "relative";
        const cQuiz = document.createElement("canvas");
        cQuiz.style.position = "absolute";
        cQuiz.style.top = "0";
        cQuiz.style.left = "0";
        cQuiz.style.width = "100%";
        cQuiz.style.height = "100%";
        cQuiz.style.zIndex = "1";
        cQuiz.style.opacity = "0.08"; 
        cQuiz.style.pointerEvents = "none";
        boxQuiz.prepend(cQuiz);

        Array.from(boxQuiz.children).forEach(child => {
            if(child !== cQuiz) child.style.position = "relative"; child.style.zIndex = "2";
        });

        const ctxQuiz = cQuiz.getContext("2d");
        let colsQuiz = [];
        const binario = "01";

        // Redimensiona o canvas ao mudar o tamanho da janela
        function resizeQuiz() { cQuiz.width = boxQuiz.clientWidth; cQuiz.height = boxQuiz.clientHeight; colsQuiz = Array(Math.floor(cQuiz.width / 16)).fill(1); }
        resizeQuiz();
        window.addEventListener("resize", resizeQuiz);

        // Desenha os dígitos binários caindo na tela
        function drawQuiz() {
            ctxQuiz.clearRect(0, 0, cQuiz.width, cQuiz.height);
            ctxQuiz.fillStyle = "#00ff41";
            ctxQuiz.font = "14px Courier New, monospace";
            for (let i = 0; i < colsQuiz.length; i++) {
                const txt = binario.charAt(Math.floor(Math.random() * binario.length));
                ctxQuiz.fillText(txt, i * 16, colsQuiz[i] * 16);
                if (colsQuiz[i] * 16 > cQuiz.height && Math.random() > 0.98) colsQuiz[i] = 0;
                colsQuiz[i]++;
            }
        }
        setInterval(drawQuiz, 55);
    }

    // ===== FORMULÁRIO DE CONTATO COM VALIDAÇÃO =====
    const btnEnviar     = document.getElementById("btn-enviar");
    const msgFeedback   = document.getElementById("msg-feedback");
    const campoNome     = document.getElementById("campo-nome");
    const campoEmail    = document.getElementById("campo-email");
    const campoMensagem = document.getElementById("campo-mensagem");

    // ===== FOLHAS CLICÁVEIS — ANIMAÇÃO DE CHACOALHAR =====
    // Aplica o efeito em todas as folhas do site, não só a da introdução
    document.querySelectorAll(".deco-folha").forEach((folha) => {
        folha.addEventListener("click", () => {
            folha.classList.remove("chacoalhar");
            void folha.offsetWidth;
            folha.classList.add("chacoalhar");
            folha.addEventListener("animationend", () => {
                folha.classList.remove("chacoalhar");
            }, { once: true });
        });
    });

    if (btnEnviar) {
        btnEnviar.addEventListener("click", () => {
            const nome     = campoNome.value.trim();
            const email    = campoEmail.value.trim();
            const mensagem = campoMensagem.value.trim();

            // Pega os textos do idioma atual
            const t = textos[idiomaAtual];

            // Verifica se algum campo está vazio
            if (!nome || !email || !mensagem) {
                msgFeedback.style.color = "#ff4444";
                msgFeedback.textContent = t.erroCampos;
                return;
            }

            // Verifica se o email tem formato válido
            const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (!emailValido) {
                msgFeedback.style.color = "#ff4444";
                msgFeedback.textContent = t.erroEmail;
                return;
            }

            // Tudo certo — mostra mensagem de agradecimento no idioma certo
            msgFeedback.style.color = "var(--verde-neon)";
            if (idiomaAtual === "es") {
                msgFeedback.textContent = t.sucesso + nome + "! Tu mensaje fue recibido.";
            } else if (idiomaAtual === "en") {
                msgFeedback.textContent = t.sucesso + nome + "! Your message was received.";
            } else {
                msgFeedback.textContent = t.sucesso + nome + "! Sua mensagem foi recebida.";
            }

            // Limpa os campos após envio
            campoNome.value     = "";
            campoEmail.value    = "";
            campoMensagem.value = "";
        });
    }
});