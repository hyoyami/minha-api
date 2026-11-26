import { sequelize } from "../config/database.js";
import { Product } from "../models/Product.js";

// [titulo, autor, genero, anoPublicacao, preco]
const livros = [
    ["Dom Casmurro", "Machado de Assis", "Clássico", 1899, 29.9],
    ["Memórias Póstumas de Brás Cubas", "Machado de Assis", "Clássico", 1881, 32.9],
    ["O Cortiço", "Aluísio Azevedo", "Clássico", 1890, 27.9],
    ["Grande Sertão: Veredas", "João Guimarães Rosa", "Clássico", 1956, 79.9],
    ["Vidas Secas", "Graciliano Ramos", "Clássico", 1938, 39.9],
    ["A Hora da Estrela", "Clarice Lispector", "Ficção", 1977, 44.9],
    ["Capitães da Areia", "Jorge Amado", "Ficção", 1937, 49.9],
    ["Sentimento do Mundo", "Carlos Drummond de Andrade", "Poesia", 1940, 42.9],
    ["1984", "George Orwell", "Distopia", 1949, 39.9],
    ["Admirável Mundo Novo", "Aldous Huxley", "Distopia", 1932, 54.9],
    ["Fahrenheit 451", "Ray Bradbury", "Distopia", 1953, 49.9],
    ["O Senhor dos Anéis: A Sociedade do Anel", "J.R.R. Tolkien", "Fantasia", 1954, 69.9],
    ["O Hobbit", "J.R.R. Tolkien", "Fantasia", 1937, 54.9],
    ["Harry Potter e a Pedra Filosofal", "J.K. Rowling", "Fantasia", 1997, 49.9],
    ["A Guerra dos Tronos", "George R.R. Martin", "Fantasia", 1996, 74.9],
    ["O Nome do Vento", "Patrick Rothfuss", "Fantasia", 2007, 79.9],
    ["Duna", "Frank Herbert", "Ficção Científica", 1965, 89.9],
    ["Fundação", "Isaac Asimov", "Ficção Científica", 1951, 49.9],
    ["Neuromancer", "William Gibson", "Ficção Científica", 1984, 59.9],
    ["O Guia do Mochileiro das Galáxias", "Douglas Adams", "Ficção Científica", 1979, 44.9],
    ["Assassinato no Expresso do Oriente", "Agatha Christie", "Mistério", 1934, 39.9],
    ["O Cão dos Baskervilles", "Arthur Conan Doyle", "Mistério", 1902, 34.9],
    ["O Código Da Vinci", "Dan Brown", "Suspense", 2003, 54.9],
    ["Garota Exemplar", "Gillian Flynn", "Thriller", 2012, 59.9],
    ["O Silêncio dos Inocentes", "Thomas Harris", "Thriller", 1988, 54.9],
    ["It: A Coisa", "Stephen King", "Terror", 1986, 99.9],
    ["O Iluminado", "Stephen King", "Terror", 1977, 64.9],
    ["Drácula", "Bram Stoker", "Terror", 1897, 44.9],
    ["Frankenstein", "Mary Shelley", "Terror", 1818, 39.9],
    ["Orgulho e Preconceito", "Jane Austen", "Romance", 1813, 39.9],
    ["O Morro dos Ventos Uivantes", "Emily Brontë", "Romance", 1847, 44.9],
    ["Como Eu Era Antes de Você", "Jojo Moyes", "Romance", 2012, 49.9],
    ["A Culpa é das Estrelas", "John Green", "Jovem Adulto", 2012, 44.9],
    ["Percy Jackson e o Ladrão de Raios", "Rick Riordan", "Aventura", 2005, 49.9],
    ["O Pequeno Príncipe", "Antoine de Saint-Exupéry", "Infantojuvenil", 1943, 24.9],
    ["Cem Anos de Solidão", "Gabriel García Márquez", "Realismo Mágico", 1967, 69.9],
    ["Dom Quixote", "Miguel de Cervantes", "Clássico", 1605, 89.9],
    ["Crime e Castigo", "Fiódor Dostoiévski", "Clássico", 1866, 79.9],
    ["O Grande Gatsby", "F. Scott Fitzgerald", "Clássico", 1925, 39.9],
    ["O Alquimista", "Paulo Coelho", "Ficção", 1988, 39.9],
    ["Sapiens: Uma Breve História da Humanidade", "Yuval Noah Harari", "História", 2011, 69.9],
    ["O Diário de Anne Frank", "Anne Frank", "Biografia", 1947, 34.9],
    ["Steve Jobs", "Walter Isaacson", "Biografia", 2011, 89.9],
    ["Hábitos Atômicos", "James Clear", "Autoajuda", 2018, 59.9],
    ["Como Fazer Amigos e Influenciar Pessoas", "Dale Carnegie", "Autoajuda", 1936, 44.9],
    ["Pai Rico, Pai Pobre", "Robert T. Kiyosaki", "Finanças", 1997, 49.9],
    ["Rápido e Devagar", "Daniel Kahneman", "Psicologia", 2011, 74.9],
    ["Uma Breve História do Tempo", "Stephen Hawking", "Ciência", 1988, 54.9],
    ["O Príncipe", "Nicolau Maquiavel", "Filosofia", 1532, 29.9],
    ["Código Limpo", "Robert C. Martin", "Tecnologia", 2008, 99.9]
]

// [titulo, autor, genero, anoPublicacao (estreia), preco] — todos volume 1
const mangas = [
    ["One Piece", "Eiichiro Oda", "Shonen", 1997, 34.9],
    ["Naruto", "Masashi Kishimoto", "Shonen", 1999, 32.9],
    ["Dragon Ball", "Akira Toriyama", "Shonen", 1984, 34.9],
    ["Bleach", "Tite Kubo", "Shonen", 2001, 32.9],
    ["Attack on Titan", "Hajime Isayama", "Shonen", 2009, 36.9],
    ["Demon Slayer: Kimetsu no Yaiba", "Koyoharu Gotouge", "Shonen", 2016, 34.9],
    ["Jujutsu Kaisen", "Gege Akutami", "Shonen", 2018, 36.9],
    ["My Hero Academia", "Kohei Horikoshi", "Shonen", 2014, 34.9],
    ["Fullmetal Alchemist", "Hiromu Arakawa", "Shonen", 2001, 39.9],
    ["Death Note", "Tsugumi Ohba e Takeshi Obata", "Suspense", 2003, 36.9],
    ["Hunter x Hunter", "Yoshihiro Togashi", "Shonen", 1998, 34.9],
    ["Yu Yu Hakusho", "Yoshihiro Togashi", "Shonen", 1990, 34.9],
    ["Os Cavaleiros do Zodíaco", "Masami Kurumada", "Shonen", 1986, 32.9],
    ["Rurouni Kenshin", "Nobuhiro Watsuki", "Shonen", 1994, 34.9],
    ["JoJo's Bizarre Adventure", "Hirohiko Araki", "Shonen", 1987, 39.9],
    ["Chainsaw Man", "Tatsuki Fujimoto", "Shonen", 2018, 36.9],
    ["One-Punch Man", "ONE e Yusuke Murata", "Shonen", 2012, 34.9],
    ["Mob Psycho 100", "ONE", "Shonen", 2012, 39.9],
    ["Black Clover", "Yuki Tabata", "Shonen", 2015, 32.9],
    ["Fairy Tail", "Hiro Mashima", "Shonen", 2006, 32.9],
    ["Dr. Stone", "Riichiro Inagaki e Boichi", "Shonen", 2017, 34.9],
    ["The Promised Neverland", "Kaiu Shirai e Posuka Demizu", "Suspense", 2016, 34.9],
    ["Spy x Family", "Tatsuya Endo", "Comédia", 2019, 36.9],
    ["Dandadan", "Yukinobu Tatsu", "Shonen", 2021, 39.9],
    ["Haikyu!!", "Haruichi Furudate", "Esporte", 2012, 34.9],
    ["Slam Dunk", "Takehiko Inoue", "Esporte", 1990, 39.9],
    ["Blue Lock", "Muneyuki Kaneshiro e Yusuke Nomura", "Esporte", 2018, 36.9],
    ["Berserk", "Kentaro Miura", "Seinen", 1989, 54.9],
    ["Vagabond", "Takehiko Inoue", "Seinen", 1998, 49.9],
    ["Vinland Saga", "Makoto Yukimura", "Seinen", 2005, 49.9],
    ["Kingdom", "Yasuhisa Hara", "Seinen", 2006, 39.9],
    ["Monster", "Naoki Urasawa", "Seinen", 1994, 59.9],
    ["20th Century Boys", "Naoki Urasawa", "Seinen", 1999, 54.9],
    ["Akira", "Katsuhiro Otomo", "Ficção Científica", 1982, 89.9],
    ["Ghost in the Shell", "Masamune Shirow", "Ficção Científica", 1989, 69.9],
    ["Tokyo Ghoul", "Sui Ishida", "Seinen", 2011, 36.9],
    ["Parasyte", "Hitoshi Iwaaki", "Terror", 1988, 49.9],
    ["Uzumaki", "Junji Ito", "Terror", 1998, 99.9],
    ["Tomie", "Junji Ito", "Terror", 1987, 89.9],
    ["Frieren e a Jornada para o Além", "Kanehito Yamada e Tsukasa Abe", "Fantasia", 2020, 39.9],
    ["Sailor Moon", "Naoko Takeuchi", "Shoujo", 1991, 39.9],
    ["Cardcaptor Sakura", "CLAMP", "Shoujo", 1996, 39.9],
    ["Fruits Basket", "Natsuki Takaya", "Shoujo", 1998, 44.9],
    ["Nana", "Ai Yazawa", "Josei", 2000, 44.9],
    ["Ao Haru Ride", "Io Sakisaka", "Shoujo", 2011, 32.9],
    ["Kimi ni Todoke", "Karuho Shiina", "Shoujo", 2005, 32.9],
    ["Kaguya-sama: Love is War", "Aka Akasaka", "Comédia Romântica", 2015, 36.9],
    ["Oshi no Ko", "Aka Akasaka e Mengo Yokoyari", "Drama", 2020, 39.9],
    ["A Voz do Silêncio", "Yoshitoki Oima", "Drama", 2013, 39.9],
    ["Yotsuba&!", "Kiyohiko Azuma", "Slice of Life", 2003, 36.9]
]

function montar(lista, categoria) {
    return lista.map(([titulo, autor, genero, anoPublicacao, preco], i) => ({
        titulo,
        autor,
        categoria,
        genero,
        anoPublicacao,
        ...(categoria === "manga" && { volume: 1 }),
        preco,
        estoque: 5 + ((i * 7) % 40)
    }))
}

const produtos = [...montar(livros, "livro"), ...montar(mangas, "manga")]

async function seed() {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log("Conectado. Inserindo produtos...")

    // titulo + categoria é único: rodar de novo não duplica
    const antes = await Product.count()
    await Product.bulkCreate(produtos, { ignoreDuplicates: true })
    const total = await Product.count()

    console.log(`Inseridos: ${total - antes} | Total no banco: ${total}`)
    await sequelize.close()
}

seed().catch(async (error) => {
    console.error("Erro ao popular o banco:", error.message)
    await sequelize.close()
    process.exit(1)
})
