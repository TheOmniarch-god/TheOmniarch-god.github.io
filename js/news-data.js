/* ======================================================================
 * ARTICLES DATA
 * ======================================================================
 * This is the encyclopedia's "articles desk": long-read dispatches that
 * are distinct from the wiki/gallery article types. They get their own
 * card on the homepage (newest first, older ones pushed behind "See
 * more"), their own /wiki/<slug>/ route, and their own magazine-style
 * layout.
 *
 * TO ADD A NEW ARTICLE: copy the template object below, fill it in, and
 * push it into OMNIARCH_NEWS (anywhere in the array — ordering here does
 * not matter, display order is computed from `date`). No other file needs
 * to change: the route, the homepage card and the /wiki/articles/ listing
 * are all generated automatically from this array.
 *
 * TEMPLATE
 * --------
 * {
 *   slug: 'articles-your-slug-here',    // route becomes /wiki/articles-your-slug-here/
 *   title: 'Headline',
 *   author: 'The Omniarch',             // byline shown on the article and its cards
 *   dek: 'One-sentence standfirst shown under the headline.',
 *   date: '2026-11-16',                 // ISO yyyy-mm-dd, drives sort order
 *   dateLabel: 'November 16, 2026',     // human-readable date shown on the page
 *   tags: ['Tag One', 'Tag Two'],       // shown as chips; grouping only, not nav categories
 *   cover: '/assets/inline/example.jpg',
 *   coverCredit: 'Art: credit line or misattribution note',
 *   coverCaption: 'Short caption under the hero image.',
 *   excerpt: 'One or two sentences used on homepage and /wiki/articles/ cards.',
 *   body: [                             // array of HTML strings, rendered as-is
 *     '<p>First paragraph…</p>',
 *     '<h3>A subheading</h3>',
 *     '<p>More paragraphs…</p>',
 *     '<blockquote>A pulled quote.<cite>Who said it</cite></blockquote>'
 *   ],
 *   sources: [                          // external reading / evidence list
 *     {label: 'Reddit thread title', url: 'https://…'},
 *     {label: 'TikTok video', url: 'https://…'}
 *   ],
 *   related: ['fang-yuan','gallery']    // optional: wiki slugs for a sidebar "See also"
 * }
 * ====================================================================== */
window.OMNIARCH_NEWS = [
  {
    slug: 'articles-legendary-chair-guy',
    title: 'The Legendary Chair Guy',
    spoiler: 'Contains major later-story spoilers.',
    author: 'The Omniarch',
    dek: 'The internet’s single most reposted picture of Fang Yuan has never, not once, been a picture of Fang Yuan. Here is Sun Tuo — and why the theft might be the most accurate portrait of Fang Yuan ever drawn.',
    date: '2026-11-16',
    dateLabel: 'November 16, 2026',
    tags: ['Fang Yuan\u2019s Stolen Clone Arts', 'Fan Culture', 'Misattribution'],
    cover: '/assets/inline/sun-tuo-chair-misattribution.jpg',
    coverCredit: 'Art: Ibuki Satsuki \u2014 depicts Sun Tuo (Ah-Tuo) from the comic collection Shan He Ren Jian, not Fang Yuan. Reproduced here for identification and commentary, not catalogued as Reverend Insanity fan art.',
    coverCaption: 'The image. You have seen it. You probably called it Fang Yuan. It is not Fang Yuan.',
    excerpt: 'For years, fans crowned a painting of a stranger sitting in a chair as the definitive face of Fang Yuan. The man in the chair is Sun Tuo, drawn by Ibuki Satsuki for an unrelated comic. The mix-up says more about Fang Yuan\u2019s philosophy than almost any officially sanctioned art ever has.',
    body: [
      '<p>Somewhere on Reddit, on a day like any other, someone finally asked the question that a thousand profile pictures had been quietly avoiding: <a href="https://www.reddit.com/r/ReverendInsanity/comments/1rbnmzn/who_is_this_legendary_chair_guy/" target="_blank" rel="noopener noreferrer">\u201cWho is this legendary chair guy?\u201d</a> It is, by a wide margin, the most-circulated \u201cFang Yuan\u201d image the fandom has ever produced \u2014 a black-haired man in dark robes, reclining in an ornately carved wooden chair beneath a bare winter tree, hands folded, eyes closed, utterly at peace. It has been a Discord avatar, a phone wallpaper, a TikTok edit backdrop and the header image of more than one fan wiki. There is just one problem. It has never been Fang Yuan.</p>',

      '<h3>Meet the real subject: Sun Tuo, who never asked for any of this</h3>',
      '<p>The painting is the work of the Chinese illustrator <strong>Ibuki Satsuki</strong> (\u6668\u6728\u9e29 / washanapple), created for <em>Shan He Ren Jian</em> \u2014 also catalogued under the title <em>Yi Chui Wu Yue Tiao Man Ji</em> \u2014 a slice-of-life comic collection following the everyday lives of characters from <em>Jian Wang 3</em>, a wuxia-themed Chinese MMORPG set in the Tang Dynasty. The man in the chair is <strong>Sun Tuo</strong>, sometimes transliterated <strong>Ah-Tuo</strong>, a character with no documented connection to <em>Reverend Insanity</em> at all. Ibuki Satsuki is, separately, a well-known illustrator in her own right \u2014 she has drawn official novel covers for other webnovels and is especially known for <em>Jian Wang 3</em> and <em>Gu Jian 3</em> fan art \u2014 but <a href="https://www.reddit.com/r/ReverendInsanity/comments/1b3f5jz/are_the_artworks_from_ibuki_satsuki_official/?tl=vi" target="_blank" rel="noopener noreferrer">she has never once drawn anything related to Gu Zhen Ren\u2019s novel</a>. Readers on r/IbukiSatsukiArt confirm the same thing from the other direction: her actual bibliography is a list of <em>other</em> licensed illustration work, and Reverend Insanity is conspicuously, permanently, absent from it.</p>',

      '<h3>How a stranger became the face of a demon lord</h3>',
      '<p>The mechanism was mundane fandom physics. <em>Reverend Insanity</em> spent years as a text-only cult favorite \u2014 translated piecemeal, lacking an official manhua for most of its life, banned on its home platform, and never blessed with a wave of professional key art the way bigger webnovels were. Readers who wanted a face to put to the name went looking, and in the absence of anything official they reached for whatever handsome, black-robed, long-haired painting of a composed Chinese man they could find and simply <em>decided</em> it was him. One widely upvoted post on r/ReverendInsanity put it bluntly: <a href="https://www.reddit.com/r/ReverendInsanity/comments/1i8ldu9/we_ri_fans_have_all_reached_supreme_grandmaster/" target="_blank" rel="noopener noreferrer">\u201cWe RI fans have all reached supreme grandmaster level in theft path\u201d</a> \u2014 cataloguing the chair portrait alongside several other images of Sun Tuo (one pouring wine, another sifting grain by a riverbank) that had all, separately, been annexed as \u201cFang Yuan.\u201d As one commenter in a later thread summarized the whole affair: <em>\u201cBack when we lacked arts so we named every male character with long black hair and black eyes Fang Yuan.\u201d</em></p>',
      '<blockquote>\u201cIronically, I had been anticipating this moment when Fang Yuan (or the man in the picture) would sit in the chair and relax like that. I thought he had achieved immortality, or accomplished his goal, or was simply resting for a while. So I read the entire novel and couldn\u2019t find a written [scene] of it, only to discover later that it wasn\u2019t actually Fang Yuan.\u201d<cite>u/Low_Hat7118, r/ReverendInsanity</cite></blockquote>',
      '<p>By the time the truth started resurfacing in earnest \u2014 repeatedly, patiently, by users citing the same two words, <a href="https://www.reddit.com/r/ReverendInsanity/comments/1tmvjva/whats_with_fang_yuan_and_the_chair_seriously/" target="_blank" rel="noopener noreferrer">\u201cartist: Ibuki Satsuki, character: Sun Tuo\u201d</a> \u2014 the chair portrait had already won. It was simply too good a piece of propaganda for a character built on reinvention to give up.</p>',

      '<h3>LarpTok canonizes the theft</h3>',
      '<p>The mix-up did not stay contained to Reddit. As <em>Reverend Insanity</em> clips spread across TikTok\u2019s \u201cLARP-core\u201d philosophy-edit circuit, the chair image became the single most-used visual shorthand for Fang Yuan in edits captioned with his quotes \u2014 to the point that the mislabeling became a recognized meme in its own right. One TikTok, <a href="https://www.tiktok.com/@embershade94/video/7601257022264298774" target="_blank" rel="noopener noreferrer">\u201cThe viral Chair Guy meme\u201d by @embershade94</a>, exists specifically to explain to newcomers why the \u201cguy sitting on a chair\u201d clip they keep seeing is not, technically, Fang Yuan at all. Others, like <a href="https://www.tiktok.com/discover/fang-yuan-true-fan-art" target="_blank" rel="noopener noreferrer">@peak__seeker\u2019s \u201cChair Guy is not Fang Yuan? Explained\u201d</a> and @kayrinn__\u2019s breakdown of the misconception, turned correcting the record into content of its own. The confusion got thorough enough, and self-aware enough, that an entire satirical wiki entry now exists cataloguing \u201c<a href="https://joke-battles.fandom.com/wiki/Fang_Yuan_(Chair_Guy)" target="_blank" rel="noopener noreferrer">Fang Yuan (Chair Guy)</a>\u201d as a meme-powered entity in his own right, half-joking that he possesses \u201cAbsorption: he completely absorbed Sun Tuo\u2019s identity; now his images are eternally associated with Fang Yuan.\u201d</p>',

      '<h3>The part where the mistake becomes the point</h3>',
      '<p>Here is the thing worth sitting with, longer than anyone sat with that chair: Fang Yuan, as a character, has no fixed sense of self to betray in the first place. His entire arc is built on shedding identities. He wears other people\u2019s faces with the Familiar Face Gu. He rebuilds his own body from scratch with the Sovereign Immortal Fetus Gu, inhabiting a form that is not his original one and was never meant to look like him. He transmigrates across five hundred years of his own life, splits his intentions across clones, and spends two thousand chapters proving that \u201cFang Yuan\u201d was never a face, a body, or even a fixed set of memories \u2014 it is a method, a will, a position relative to everyone else\u2019s plans. A character who is written to be infinitely replaceable, infinitely disguisable, and allergic to anything as rigid as a single canonical appearance was always going to be the easiest person in fiction to mistake for someone else. In a strange way, he can be everything, even beyond the boundaries of his own story \u2014 and the chair portrait is proof of just how far that reach extends.</p>',
      '<p>So no: it was never Fang Yuan sitting in that chair. It was Sun Tuo, a character from a completely different work, by a completely different artist, for a completely different fandom. But the identity was not stolen only by the ignorance of fans scrambling for a reference image. Read the novel\u2019s own logic back onto the mix-up, and it looks less like an accident and more like Fang Yuan doing to the internet exactly what he does to every grotto-heaven, inheritance and face he has ever taken: claiming something that was never his, quietly, patiently, until the claim became indistinguishable from the truth. The fandom did not steal Sun Tuo\u2019s face for Fang Yuan. Fang Yuan, as a narrative gravity well, pulled it in \u2014 the same way he pulls in resources, bodies, luck and entire clans that were never his to take. If anyone \u201cstole\u201d this image, the thief with the better claim to the crime is the demon lord himself.</p>',
      '<p>Read that way, the chair portrait stops being an embarrassing error and starts looking like one of the more sophisticated pieces of accidental literary criticism this fandom has ever produced. It is a symbol of Fang Yuan\u2019s top ascension in fictional writing: a character so thoroughly defined by reinvention, theft and the hollowing-out of other people\u2019s identities that his fandom reenacted his entire philosophy without realizing it, using a stranger\u2019s portrait as the unwitting vessel. The brilliance of Gu Zhen Ren\u2019s writing was never that Fang Yuan looks a certain way \u2014 it is that he does not need to. Somewhere, Sun Tuo is still sitting quietly in his chair, having never heard of Reverend Insanity, having become one of its most iconic pieces of unofficial canon anyway.</p>',

      '<h3>Fang Yuan\u2019s Stolen Clone Arts</h3>',
      '<p>This chair portrait is the first entry under a tag we are starting on this wiki: <strong>Fang Yuan\u2019s Stolen Clone Arts</strong> \u2014 a running record of images that fandom history has, at one point or another, crowned as Fang Yuan without his actual consent (or his artist\u2019s). It is not a short list. A companion piece of Sun Tuo pouring wine by a riverbank has made the same journey. <a href="https://www.reddit.com/r/okbuddybaka/comments/1qxwa3n/top_5_chair_guys/" target="_blank" rel="noopener noreferrer">A \u201cTop 5 chair guys\u201d roundup</a> turned the phenomenon into its own meta-meme outside the fandom entirely. A red-robed figure with arms spread wide in flight has been claimed and disclaimed in the same breath more than once. One Reddit thread even compares the chair portrait\u2019s aesthetic to a <em>completely unrelated</em> villain from a Mount Hua Sect manhwa, because at this point the image has been attributed to so many different properties that its actual origin keeps needing to be re-discovered. None of these pieces appear in this encyclopedia\u2019s art gallery, for the same reason the chair portrait does not: they are not Reverend Insanity fan art. They are Reverend Insanity <em>folklore</em> \u2014 a second, informal canon made entirely of other people\u2019s unrelated work, held together by nothing but how well it fits a character who was always going to outgrow his own illustrations.</p>',

      '<h3>Where the real art lives</h3>',
      '<p>None of this is a knock on the fandom\u2019s actual artists, who exist, and whose work is both plentiful and properly credited. OSOT\u2019s paintings, Kodoku Studio\u2019s fan manhua, and dozens of Chinese illustrators represented in <a href="/wiki/gallery">this wiki\u2019s gallery</a> have drawn Fang Yuan as himself \u2014 not borrowed, not misattributed, not quietly absorbed from somebody else\u2019s comic. If you want to know what Fang Yuan actually looks like when an artist sits down and draws Reverend Insanity on purpose, that gallery is the place to look. The chair, as magnificent as it is, was never one of them.</p>'
    ],
    sources: [
      {label: 'r/ReverendInsanity \u2014 "Who is this legendary chair guy?"', url: 'https://www.reddit.com/r/ReverendInsanity/comments/1rbnmzn/who_is_this_legendary_chair_guy/'},
      {label: 'r/ReverendInsanity \u2014 "What\u2019s with fang yuan and the chair? Seriously"', url: 'https://www.reddit.com/r/ReverendInsanity/comments/1tmvjva/whats_with_fang_yuan_and_the_chair_seriously/'},
      {label: 'r/ReverendInsanity \u2014 "Lol I always thought this story took inspiration from Reverend Insanity. This chair scene confirms it."', url: 'https://www.reddit.com/r/ReverendInsanity/comments/1p020ax/lol_i_always_thought_this_story_took_inspiration/'},
      {label: 'r/ReverendInsanity \u2014 "We RI fans have all reached supreme grandmaster level in theft path"', url: 'https://www.reddit.com/r/ReverendInsanity/comments/1i8ldu9/we_ri_fans_have_all_reached_supreme_grandmaster/'},
      {label: 'r/ReverendInsanity (Vietnamese) \u2014 "Are the artworks from Ibuki Satsuki official?"', url: 'https://www.reddit.com/r/ReverendInsanity/comments/1b3f5jz/are_the_artworks_from_ibuki_satsuki_official/?tl=vi'},
      {label: 'r/IbukiSatsukiArt \u2014 artist biography thread', url: 'https://www.reddit.com/r/IbukiSatsukiArt/comments/1n551w0/biography/'},
      {label: 'r/okbuddybaka \u2014 "Top 5 chair guys"', url: 'https://www.reddit.com/r/okbuddybaka/comments/1qxwa3n/top_5_chair_guys/'},
      {label: 'Joke Battles Wikia \u2014 "Fang Yuan (Chair Guy)"', url: 'https://joke-battles.fandom.com/wiki/Fang_Yuan_(Chair_Guy)'},
      {label: 'TikTok \u2014 @embershade94, "The viral Chair Guy meme"', url: 'https://www.tiktok.com/@embershade94/video/7601257022264298774'},
      {label: 'TikTok \u2014 "Fang Yuan True Fan Art" (discover page, incl. @peak__seeker and @kayrinn__)', url: 'https://www.tiktok.com/discover/fang-yuan-true-fan-art'}
    ],
    related: ['fang-yuan', 'gallery', 'community-omniarch']
  },
  {
    slug: 'articles-the-hiatus-letter',
    title: 'The Hiatus Letter: What Gu Zhen Ren Told Readers About His Depression',
    author: 'The Omniarch',
    dek: 'On September 23, 2026, after a month of silence, Reverend Insanity’s anonymous author finally told readers where he had gone — and the fandom that has spent years quietly worrying about him got the most honest answer it has ever received.',
    date: '2026-11-17',
    dateLabel: 'November 17, 2026',
    tags: ['Author Updates', 'Community', 'Gu Zhen Ren'],
    cover: '/assets/inline/gu-zhen-ren-hiatus-letter-sept2026.png',
    coverCredit: 'Source: the author’s own Qidian chapter page, posted under Xian Gong Kai Wu on September 23, 2026 at 17:12 — reproduced here for identification and commentary, not catalogued as a chapter of the novel.',
    coverCaption: '“正在被生活痛揍着……” — “Currently being beaten up by life…” — the title Gu Zhen Ren gave his September 23, 2026 letter to readers.',
    excerpt: 'For a month, Xian Gong Kai Wu simply stopped updating. When Gu Zhen Ren finally broke the silence, he did not blame his publisher, or his readers, or even his health alone. He told them, plainly, that he had been diagnosed with mild depression and anxiety — and that this was not the first time writing had nearly broken him.',
    body: [
      '<p>For a month, chapters of <em>Xian Gong Kai Wu</em> — the serialized fantasy Gu Zhen Ren has been writing since April 2024, two books on from the banned <em>Reverend Insanity</em> — simply stopped appearing. No placeholder chapter, no announcement, nothing. Readers filled the silence the way readers always do: worried comments, a few jokes, a lot of “is he okay” posted into a comment section the author may or may not have been reading. A month earlier he had mentioned catching COVID-19 again and asked for a week off. The week came and went. Then another three.</p>',

      '<h3>The letter</h3>',
      '<p>Then, on <strong>September 23, 2026 at 17:12</strong>, something appeared on Qidian that was not a chapter. It was titled, simply, <em>“正在被生活痛揍着……”</em> — <em>“Currently being beaten up by life…”</em> — and it ran to 908 words, the most direct account Gu Zhen Ren has ever given his readers of what a hiatus actually costs him. The translation that circulated afterward on <a href="https://www.reddit.com/r/ReverendInsanity/comments/1wp03jm/latest_news_gu_zhen_ren_is_currently_dealing_with/" target="_blank" rel="noopener noreferrer">r/ReverendInsanity</a> opens with an apology, not an excuse:</p>',
      '<blockquote>“During this month-long hiatus, many of you left caring messages, while many others were eager for updates. First of all, I sincerely want to say to everyone: I am deeply sorry! It was wrong of me to leave everyone who cares about this story hanging and waiting in vain for so long, and I have kept this sense of guilt in my heart.”<cite>Gu Zhen Ren, September 23, 2026</cite></blockquote>',
      '<p>What follows is unusually specific for a webnovel author’s update post. He describes years of desk work and an irregular schedule finally catching up with him physically — fatigue, a head that felt tense after even brief concentration, then insomnia so persistent that days turned foggy and exhausting. Then he names what came next in plain clinical terms:</p>',
      '<blockquote>“I went to the hospital for an evaluation, and it was diagnosed as mild depression accompanied by anxiety. When I’m in a good state, my mind is clear and I feel everything is manageable. But once an episode hits, I plunge into powerlessness and self-doubt. Even though I know what to write, I lack the strength to put pen to paper. My emotions swing wildly, floating and sinking like waves, completely beyond my control.”<cite>Gu Zhen Ren, September 23, 2026</cite></blockquote>',
      '<p>He is careful, almost defensively so, to draw a line between explaining and excusing: “I will not use health issues as a permanent shield, nor am I playing the pity card to seek sympathy. A hiatus is a hiatus, and the responsibility lies solely with me.” He describes a course of medication, adjusted sleep schedules and psychological counselling, deliberately cutting down on information overload, and forcing himself outside to walk and clear his head — and he is equally careful not to promise a fast fix. There is no return date in the letter. Instead there is a plan to rebuild in short, fixed-duration writing sessions and bring the update frequency back “step by step,” once the recovery “consolidates further.”</p>',

      '<h3>Not the first time</h3>',
      '<p>Readers who have followed Gu Zhen Ren for more than a few years recognized the shape of this letter immediately, because it is not the first one like it. After <em>Reverend Insanity</em> itself was pulled from Qidian in 2019 amid a nationwide crackdown on web fiction, the author wrote in a 2020 preface to his next book that the ban had produced “the biggest crisis” of his writing career:</p>',
      '<blockquote>“I have signs of depression and almost bid farewell to my profession as an author. The process is very painful, suffering every day. So, day by day, month by month, slowly enduring it. The exterior is calm and peaceful, while my heart is turbulent and dark, walking between the cliffs.”<cite>Gu Zhen Ren, preface, 2020</cite></blockquote>',
      '<p>A Q&amp;A session in the series’ official QQ group, later translated and <a href="https://www.reddit.com/r/ReverendInsanity/comments/y9r9b9/qas_of_ri_from_gu_zhen_ren_author_and_fans_in/" target="_blank" rel="noopener noreferrer">archived on r/ReverendInsanity</a>, put the same period in starker terms still: “When RI was banned, I almost got depressive disorder. It took me months to get better,” he told fans directly, adding that his life “went miserable for months” afterward. This encyclopedia will not reproduce the fuller detail of that period’s darkest line here, except to note that it is a matter of public record in the fandom and that the author describes having since recovered from it. The pattern across six years — a ban-era crisis in 2019–2020, a financially strained hiatus during <em>Infinite Bloodcore</em> in 2023, and now a clinically diagnosed episode in 2026 — is less a string of unrelated incidents than a single, ongoing cost that writing this particular career has repeatedly extracted from one person.</p>',

      '<h3>How the fandom responded</h3>',
      '<p>If the letter itself was unusually candid, the response underneath it was unusually gentle for a comment section used to counting the days between updates. “Sending prayers,” read one of the first replies. “My goat is currently recovering from being too peak,” wrote another, “his spirit is strong, but the human body is weak.” A reader identified the irony first: “A hiatus is indeed still a hiatus… if anyone complains about it, their brains are smoother than a primeval stone.” Another simply wrote, “I for one never complained. Understanding is a show of maturity.”</p>',
      '<p>This was not a one-off outpouring. It is a pattern of its own. In 2023, with the author visibly struggling through <em>Infinite Bloodcore</em>, a thread titled <a href="https://www.reddit.com/r/ReverendInsanity/comments/17ommqu/lets_put_our_heads_together_and_support_gu_zhen/" target="_blank" rel="noopener noreferrer">“Let’s put our heads together and support Gu Zhen Ren”</a> tried to organize a way to get money to an author who, as one commenter noted, “cannot make any profits from his previous books” because of the ban. A separate, long-running thread simply invites <a href="https://www.reddit.com/r/ReverendInsanity/comments/1eymvyy/i_am_chinese_please_go_here_if_you_want_to_leave/" target="_blank" rel="noopener noreferrer">messages for the author to read</a>, filled with lines like “please take care of your health, there is only one of you in this world” and “we love you.” None of this is the kind of attention a studio public-relations team manufactures. It is a fandom that built its own, slower infrastructure for checking on a stranger it has never met and, by his own account, probably never will.</p>',

      '<h3>What this changes, and what it does not</h3>',
      '<p>The letter does not restart <em>Reverend Insanity</em>, which remains banned, unfinished one chapter short of its final battle, and outside Gu Zhen Ren’s control to revive even if his health fully recovers tomorrow. It does not set a date for <em>Xian Gong Kai Wu</em>’s next chapter, and it explicitly asks readers not to expect one soon. What it does is close, for now, a month of silence with something more valuable than a chapter: an honest account from a person the fandom has spent years reducing to a pen name, a reputation and a long list of grievances about pacing. “Writing is my passion and my responsibility,” he wrote near the end of the letter, “but the prerequisite is that I must stabilize myself first.”</p>',
      '<p>It is a strange thing to read a sentence like that from the creator of a protagonist defined by his refusal to ever stop, rest, or admit weakness. Fang Yuan schemes through broken bodies, burned clans and five hundred years of accumulated damage without once putting down the pen on his own ambitions. His author, it turns out, is made of considerably more ordinary material — and says so, plainly, in 908 words that did more to humanize him than seven years of chapters ever needed to. This encyclopedia wishes him a genuine, unhurried recovery.</p>'
    ],
    sources: [
      {label: 'r/ReverendInsanity — "Latest News: Gu Zhen Ren is currently dealing with health issues and mild depression" (full translated letter, Sept 23–24, 2026)', url: 'https://www.reddit.com/r/ReverendInsanity/comments/1wp03jm/latest_news_gu_zhen_ren_is_currently_dealing_with/'},
      {label: 'Mysteries (@LOTM_WORLD) on X — announcement thread, September 23, 2026', url: 'https://x.com/LOTM_WORLD/status/2102807542321545368'},
      {label: 'Wikipedia — "Reverend Insanity" (author background and Xian Gong Kai Wu serialization)', url: 'https://en.wikipedia.org/wiki/Reverend_Insanity'},
      {label: 'r/ReverendInsanity — "When RL was banned, Gu Zhen Ren suffering from depression" (2020 preface quotes)', url: 'https://www.reddit.com/r/ReverendInsanity/comments/1hkm9dt/when_rl_was_banned_gu_zhen_ren_suffering_from/'},
      {label: 'r/ReverendInsanity — "Q&As of RI from Gu Zhen Ren (author) and fans in official QQ group"', url: 'https://www.reddit.com/r/ReverendInsanity/comments/y9r9b9/qas_of_ri_from_gu_zhen_ren_author_and_fans_in/'},
      {label: 'r/ReverendInsanity — "Let’s put our heads together and support Gu Zhen Ren" (2023)', url: 'https://www.reddit.com/r/ReverendInsanity/comments/17ommqu/lets_put_our_heads_together_and_support_gu_zhen/'},
      {label: 'r/ReverendInsanity — "I am Chinese, please go here if you want to leave a message for RI authors!"', url: 'https://www.reddit.com/r/ReverendInsanity/comments/1eymvyy/i_am_chinese_please_go_here_if_you_want_to_leave/'},
      {label: 'Scribd mirror — "Gu Zhen Ren: Ban Update & New Novel" (2020 preface, English translation)', url: 'https://www.scribd.com/document/912937083/Very-Important-Prelude'}
    ],
    related: ['gu-zhen-ren', 'authors-preface', 'community-omniarch']
  }
  /* Add future articles above this line, following the template at the top of this file. */
];

/* Opening-chapter essays and community context; dates are publication dates, not event dates. */
window.OMNIARCH_NEWS = window.OMNIARCH_NEWS.concat([
  {
    "slug": "articles-fang-yuan-second-life",
    "title": "Why Fang Yuan’s Second Life Starts With a Disadvantage",
    "author": "AI-assisted editorial draft",
    "dek": "His memories promise an advantage; his young body and limited resources immediately put that promise under pressure.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Character",
      "Opening chapters"
    ],
    "cover": "/assets/inline/liu-guanyi-fang-yuan.webp",
    "coverCredit": "Illustration: Fang Yuan; art by Liu Guanyi",
    "excerpt": "His memories promise an advantage; his young body and limited resources immediately put that promise under pressure.",
    "spoiler": "Contains spoilers through Chapter 1.",
    "body": [
      "<p>Fang Yuan returns to Qing Mao Mountain with memories of five hundred years, but he does not return with the power he had at the siege. His experience and his present circumstances belong to different scales. That mismatch is the engine of the opening.</p>",
      "<h3>Experience is not a shortcut</h3>",
      "<p>He knows people, places and possibilities that his classmates do not. Yet knowledge cannot by itself open an aperture, buy resources or persuade a clan to overlook suspicious behavior. He must work through the same institutions as everyone else.</p>",
      "<h3>A protagonist who remembers</h3>",
      "<p>The rebirth premise makes ordinary scenes double as comparisons between two lives. We watch a teenager in a classroom, but we also follow someone measuring the scene against a long history that nobody around him can see.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 1",
        "url": "/reader/chapter-1/"
      }
    ],
    "related": [
      "fang-yuan"
    ]
  },
  {
    "slug": "articles-spring-autumn-cicada-cost",
    "title": "The Spring Autumn Cicada Is More Than a Reset Button",
    "author": "AI-assisted editorial draft",
    "dek": "The opening miracle comes with a cost, making time reversal a dangerous premise rather than an easy escape.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Gu",
      "Opening chapters"
    ],
    "cover": "/assets/inline/art-spring-autumn-cicada.webp",
    "coverCredit": "Illustration: Spring Autumn Cicada; art by mc人祖",
    "excerpt": "The opening miracle comes with a cost, making time reversal a dangerous premise rather than an easy escape.",
    "spoiler": "Contains spoilers through Chapter 2.",
    "body": [
      "<p>The first chapter begins with Fang Yuan surrounded and ends with an extraordinary reversal. The Spring Autumn Cicada sends him back to his youth, allowing the story to begin after what looks like a final defeat.</p>",
      "<h3>A price attached to return</h3>",
      "<p>Chapter 2 explains that using the Gu costs the user’s life, body and cultivation. The return therefore cannot be treated as a free correction: an enormous investment and the life built around it have been spent.</p>",
      "<h3>A new kind of suspense</h3>",
      "<p>Rather than asking only whether Fang Yuan will win, the opening asks how he will use a second chance. The Cicada introduces time as a resource and a burden, not merely a spectacle.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 2",
        "url": "/reader/chapter-2/"
      }
    ],
    "related": [
      "spring-autumn-cicada"
    ]
  },
  {
    "slug": "articles-fang-zheng-brother",
    "title": "Fang Zheng and the Weight of Being the Other Twin",
    "author": "AI-assisted editorial draft",
    "dek": "The brothers’ resemblance makes their different standing within the clan especially revealing.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Character",
      "Opening chapters"
    ],
    "cover": "/assets/inline/art-fang-zheng.webp",
    "coverCredit": "Illustration: Fang Zheng; art by mc人祖",
    "excerpt": "The brothers’ resemblance makes their different standing within the clan especially revealing.",
    "spoiler": "Contains spoilers through Chapter 6.",
    "body": [
      "<p>Fang Yuan and Fang Zheng are twins, but the clan does not treat their futures as interchangeable. The aperture test places them on sharply different trajectories: Fang Yuan is measured at grade C, while Fang Zheng receives grade A.</p>",
      "<h3>From comparison to expectation</h3>",
      "<p>The result changes how others look at Fang Zheng. A high aptitude attracts attention and investment, but it also places him inside a network of expectations. What looks like recognition can become a demand to live up to a role.</p>",
      "<h3>Why the contrast matters</h3>",
      "<p>Their similar faces make the difference in treatment harder to miss. The brothers are useful foils not because one has a simple moral monopoly, but because their different experiences expose how the clan distributes status and opportunity.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 6",
        "url": "/reader/chapter-6/"
      }
    ],
    "related": [
      "fang-zheng"
    ]
  },
  {
    "slug": "articles-aperture-opening",
    "title": "The Aperture Ceremony: A Coming of Age With Consequences",
    "author": "AI-assisted editorial draft",
    "dek": "A ritual of hope is also a public measurement of who the clan considers worth investing in.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Worldbuilding",
      "Opening chapters"
    ],
    "cover": "/assets/inline/qing-mao-mountain.webp",
    "coverCredit": "Illustration: Qing Mao Mountain; artist not credited",
    "excerpt": "A ritual of hope is also a public measurement of who the clan considers worth investing in.",
    "spoiler": "Contains spoilers through Chapter 5.",
    "body": [
      "<p>The aperture-opening ceremony gathers the clan’s young people for a test that will shape their place in Gu Yue society. As they move through the field, Hope Gu help open the aperture that makes cultivation possible.</p>",
      "<h3>An invisible resource becomes public</h3>",
      "<p>What the test reveals is not just a private talent. Aptitude is announced and compared, turning an individual result into a matter of public expectation. Family ambitions and clan interests meet in a single ceremony.</p>",
      "<h3>Hope and hierarchy</h3>",
      "<p>The imagery is hopeful, but the outcome is unequal. The ceremony helps explain how a community can celebrate everyone’s beginning while already dividing its resources according to their apparent prospects.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 5",
        "url": "/reader/chapter-5/"
      }
    ],
    "related": [
      "aperture-opening-ceremony"
    ]
  },
  {
    "slug": "articles-aptitude-grades",
    "title": "What Aptitude Grades Actually Mean in the Opening",
    "author": "AI-assisted editorial draft",
    "dek": "Grades matter, but the opening chapters show why aptitude is not the same thing as a complete person.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Worldbuilding",
      "Opening chapters"
    ],
    "cover": "/assets/inline/qing-mao-mountain.webp",
    "coverCredit": "Illustration: Qing Mao Mountain; artist not credited",
    "excerpt": "Grades matter, but the opening chapters show why aptitude is not the same thing as a complete person.",
    "spoiler": "Contains spoilers through Chapter 6.",
    "body": [
      "<p>The clan’s aptitude test assigns grades that help predict cultivation potential. Fang Yuan’s grade C and Fang Zheng’s grade A become more than technical measurements: they change the attention each brother receives.</p>",
      "<h3>The size of a reserve</h3>",
      "<p>In the early explanation of cultivation, aptitude is associated with the amount of primeval essence a Gu Master can hold. A larger reserve affects how much energy is available for training and using Gu.</p>",
      "<h3>A number is not a verdict</h3>",
      "<p>The test measures a property of the aperture, not wisdom, kindness or experience. Reading the grade as a social label as well as a mechanical limit makes the brothers’ different reception more meaningful.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 6",
        "url": "/reader/chapter-6/"
      }
    ],
    "related": [
      "aptitude-grades"
    ]
  },
  {
    "slug": "articles-primeval-essence",
    "title": "Primeval Essence: The Fuel Behind Gu Cultivation",
    "author": "AI-assisted editorial draft",
    "dek": "A practical introduction to the resource that makes early cultivation feel strategic.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Gu",
      "Opening chapters"
    ],
    "cover": "/assets/inline/art-spring-autumn-cicada.webp",
    "coverCredit": "Illustration: Spring Autumn Cicada; art by mc人祖",
    "excerpt": "A practical introduction to the resource that makes early cultivation feel strategic.",
    "spoiler": "Contains spoilers through Chapter 10.",
    "body": [
      "<p>Gu Masters rely on primeval essence stored in the aperture. The early chapters introduce it through cultivation lessons and the students’ first attempts to refine Gu, giving a concrete cost to what might otherwise look like effortless magic.</p>",
      "<h3>Capacity and recovery</h3>",
      "<p>The amount a student can hold and the rate at which it recovers matter when a task takes sustained effort. Fang Yuan and Fang Zheng do not begin with the same reserve, so their apparent opportunities differ.</p>",
      "<h3>The value of a limit</h3>",
      "<p>Because power is spent rather than simply declared, decisions acquire a practical dimension. A reader can follow the pressure of limited resources without needing to memorize every future rank or technique.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 10",
        "url": "/reader/chapter-10/"
      }
    ],
    "related": [
      "primeval-essence"
    ]
  },
  {
    "slug": "articles-primeval-stones",
    "title": "Why Primeval Stones Matter to a Gu Master",
    "author": "AI-assisted editorial draft",
    "dek": "Money, cultivation and scarcity meet in one of the story’s most useful resources.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Worldbuilding",
      "Opening chapters"
    ],
    "cover": "/assets/inline/qing-mao-mountain.webp",
    "coverCredit": "Illustration: Qing Mao Mountain; artist not credited",
    "excerpt": "Money, cultivation and scarcity meet in one of the story’s most useful resources.",
    "spoiler": "Contains spoilers through Chapter 11.",
    "body": [
      "<p>Primeval stones have value in the Gu world, but the opening chapters make them more than ordinary money. They are connected to the resources Gu Masters need for cultivation and help determine which options are within reach.</p>",
      "<h3>The cost of an opportunity</h3>",
      "<p>Fang Yuan’s interest in the Liquor Worm comes with a calculation: refining it will require resources. A promising find is not automatically a usable advantage when the next step carries a cost.</p>",
      "<h3>Economics as suspense</h3>",
      "<p>The stones make inequality visible in small decisions. Who can afford to experiment, recover from a mistake or pursue an opportunity? These questions give the power system an economic texture as well as a magical one.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 11",
        "url": "/reader/chapter-11/"
      }
    ],
    "related": [
      "primeval-stones"
    ]
  },
  {
    "slug": "articles-moonlight-gu",
    "title": "Moonlight Gu and the Power of Clan Tradition",
    "author": "AI-assisted editorial draft",
    "dek": "A clan’s signature Gu is both a weapon and an expression of institutional control.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Gu",
      "Opening chapters"
    ],
    "cover": "/assets/inline/art-spring-autumn-cicada.webp",
    "coverCredit": "Illustration: Spring Autumn Cicada; art by mc人祖",
    "excerpt": "A clan’s signature Gu is both a weapon and an expression of institutional control.",
    "spoiler": "Contains spoilers through Chapter 10.",
    "body": [
      "<p>Moonlight Gu is closely associated with the Gu Yue Clan. In the opening lessons, the students’ first Gu choices become a way of understanding how the clan trains its next generation.</p>",
      "<h3>More than a family emblem</h3>",
      "<p>A shared technique gives the clan recognizable strengths and a basis for instruction. The Moonlight Gu is not simply a decorative symbol; it belongs to the practical organization of training and power.</p>",
      "<h3>A choice made within a system</h3>",
      "<p>When Fang Yuan considers his options, the familiar choice has institutional support while alternatives may demand extra effort. That contrast shows how personal ambition must negotiate established methods.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 10",
        "url": "/reader/chapter-10/"
      }
    ],
    "related": [
      "moonlight-gu"
    ]
  },
  {
    "slug": "articles-liquor-worm",
    "title": "The Liquor Worm and the Price of an Early Opportunity",
    "author": "AI-assisted editorial draft",
    "dek": "A mysterious Gu turns a remembered possibility into a problem of timing and resources.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Gu",
      "Opening chapters"
    ],
    "cover": "/assets/inline/art-spring-autumn-cicada.webp",
    "coverCredit": "Illustration: Spring Autumn Cicada; art by mc人祖",
    "excerpt": "A mysterious Gu turns a remembered possibility into a problem of timing and resources.",
    "spoiler": "Contains spoilers through Chapter 11.",
    "body": [
      "<p>Fang Yuan remembers a cave and a treasure associated with the Flower-Wine Monk. The Liquor Worm is important to him not because it guarantees an easy victory, but because his knowledge lets him recognize an opportunity others do not see in the same way.</p>",
      "<h3>Knowing is not possessing</h3>",
      "<p>The early chapters make a distinction between remembering a lead and actually obtaining and refining a Gu. Even the prospect of a useful discovery demands time, resources and a workable plan.</p>",
      "<h3>A small-scale model of strategy</h3>",
      "<p>This is the novel’s larger strategic pattern in miniature: information has value only when it can be acted upon. Fang Yuan must convert memory into an advantage while navigating the constraints of his present life.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 11",
        "url": "/reader/chapter-11/"
      }
    ],
    "related": [
      "liquor-worm"
    ]
  },
  {
    "slug": "articles-hope-gu-and-ren-zu",
    "title": "Hope Gu: Where a Myth Meets a Classroom",
    "author": "AI-assisted editorial draft",
    "dek": "The Legends of Ren Zu give the aperture ceremony a meaning beyond its technical function.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Ideas",
      "Opening chapters"
    ],
    "cover": "/assets/inline/art-spring-autumn-cicada.webp",
    "coverCredit": "Illustration: Spring Autumn Cicada; art by mc人祖",
    "excerpt": "The Legends of Ren Zu give the aperture ceremony a meaning beyond its technical function.",
    "spoiler": "Contains spoilers through Chapter 5.",
    "body": [
      "<p>In the story told during the aperture ceremony, Hope Gu comes from Ren Zu’s heart. In the ceremony itself, points of light in the flower field help the youths open their apertures. Myth and practice are placed side by side.</p>",
      "<h3>A story within a story</h3>",
      "<p>The legend does not need to be read as a modern scientific explanation. It gives the community a shared language for an experience that is personally important and socially consequential.</p>",
      "<h3>The tension in the image</h3>",
      "<p>Hope opens the way, but it does not erase differences in aptitude or status. That tension gives the symbol force: the same ceremony can represent possibility for the participants and judgment by the clan.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 5",
        "url": "/reader/chapter-5/"
      }
    ],
    "related": [
      "hope-gu"
    ]
  },
  {
    "slug": "articles-legends-of-ren-zu",
    "title": "How to Read The Legends of Ren Zu",
    "author": "AI-assisted editorial draft",
    "dek": "The embedded mythology can be read as a story, a teaching device and a mirror for the Gu world.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Ideas",
      "Opening chapters"
    ],
    "cover": "/assets/inline/art-spring-autumn-cicada.webp",
    "coverCredit": "Illustration: Spring Autumn Cicada; art by mc人祖",
    "excerpt": "The embedded mythology can be read as a story, a teaching device and a mirror for the Gu world.",
    "spoiler": "Contains spoilers through Chapter 5.",
    "body": [
      "<p>The Legends of Ren Zu introduces figures and Gu in a mythic register distinct from the clan’s everyday routines. In the opening chapters, the tale of Ren Zu and Hope is tied directly to the ceremony the students undergo.</p>",
      "<h3>A fable with consequences</h3>",
      "<p>The legend uses named forces and encounters to dramatize abstract ideas. Its characters and symbols invite interpretation, but the book also lets them remain part of the world’s own storytelling tradition.</p>",
      "<h3>Read the parallels carefully</h3>",
      "<p>A myth may echo Fang Yuan’s situation without being a simple instruction manual for him. The most rewarding approach is to notice both the resemblance and the differences between the fable and the lives around it.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 5",
        "url": "/reader/chapter-5/"
      }
    ],
    "related": [
      "the-legends-of-ren-zu"
    ]
  },
  {
    "slug": "articles-qing-mao-mountain",
    "title": "Qing Mao Mountain: The Beginning Is a Place",
    "author": "AI-assisted editorial draft",
    "dek": "The mountain is not just a backdrop; it shapes the clan, its resources and its encounters.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Worldbuilding",
      "Opening chapters"
    ],
    "cover": "/assets/inline/qing-mao-mountain.webp",
    "coverCredit": "Illustration: Qing Mao Mountain; artist not credited",
    "excerpt": "The mountain is not just a backdrop; it shapes the clan, its resources and its encounters.",
    "spoiler": "Contains spoilers through Chapter 7.",
    "body": [
      "<p>Qing Mao Mountain gives the opening a bounded landscape. Gu Yue Village is located there, and its neighboring clans and surrounding terrain make the world feel larger than Fang Yuan’s household.</p>",
      "<h3>The landscape has an economy</h3>",
      "<p>Spear bamboo and traveling caravans are details that connect place to material life. The mountain offers resources, but it also implies distance, trade and competition rather than an isolated fantasy stage.</p>",
      "<h3>Why starting small helps</h3>",
      "<p>Beginning with a particular village allows readers to learn the rules through local stakes. The broader world matters because the story first shows how a community survives and assigns power in one place.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 7",
        "url": "/reader/chapter-7/"
      }
    ],
    "related": [
      "qing-mao-mountain"
    ]
  },
  {
    "slug": "articles-gu-yue-clan",
    "title": "Inside the Gu Yue Clan: Family, Training and Power",
    "author": "AI-assisted editorial draft",
    "dek": "Belonging to the same clan does not mean its members begin on equal terms.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Worldbuilding",
      "Opening chapters"
    ],
    "cover": "/assets/inline/qing-mao-mountain.webp",
    "coverCredit": "Illustration: Qing Mao Mountain; artist not credited",
    "excerpt": "Belonging to the same clan does not mean its members begin on equal terms.",
    "spoiler": "Contains spoilers through Chapter 4.",
    "body": [
      "<p>The Gu Yue Clan is the institution organizing much of Fang Yuan’s early world. Kinship, schooling and cultivation are intertwined: a young person’s prospects are bound up with family connections and the clan’s judgment.</p>",
      "<h3>The clan as support</h3>",
      "<p>The academy and the aperture ceremony give students a shared route into cultivation. Clan traditions provide knowledge and resources that individuals would struggle to assemble alone.</p>",
      "<h3>The clan as constraint</h3>",
      "<p>Support is selective and status matters. Looking at the clan from Fang Yuan’s position shows how collective belonging can offer protection while also requiring obedience and accepting unequal distribution.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 4",
        "url": "/reader/chapter-4/"
      }
    ],
    "related": [
      "gu-yue-clan"
    ]
  },
  {
    "slug": "articles-academy-and-status",
    "title": "The Academy Is Also a Lesson in Status",
    "author": "AI-assisted editorial draft",
    "dek": "The classroom teaches cultivation, but the students are also learning where they stand.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Ideas",
      "Opening chapters"
    ],
    "cover": "/assets/inline/art-spring-autumn-cicada.webp",
    "coverCredit": "Illustration: Spring Autumn Cicada; art by mc人祖",
    "excerpt": "The classroom teaches cultivation, but the students are also learning where they stand.",
    "spoiler": "Contains spoilers through Chapter 8.",
    "body": [
      "<p>The academy gives the young Gu Yue generation a common setting in which to learn about cultivation and choose their first Gu. On the surface, everyone attends the same institution. Underneath, their prospects are already being sorted.</p>",
      "<h3>Rules are never just rules</h3>",
      "<p>A standardized lesson can serve the clan as a whole, while students bring different family circumstances and aptitudes into the room. The same opportunity may cost one student more than another.</p>",
      "<h3>Reading the room</h3>",
      "<p>Fang Yuan’s unusual perspective makes the academy more than an exposition scene. It becomes a place to observe how authority presents itself and how individuals respond to the rewards and limits it sets.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 8",
        "url": "/reader/chapter-8/"
      }
    ],
    "related": [
      "gu-yue-clan"
    ]
  },
  {
    "slug": "articles-five-hundred-years",
    "title": "What Five Hundred Years of Memory Changes",
    "author": "AI-assisted editorial draft",
    "dek": "Fang Yuan’s knowledge changes the meaning of familiar faces, but it does not make the future certain.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Character",
      "Opening chapters"
    ],
    "cover": "/assets/inline/liu-guanyi-fang-yuan.webp",
    "coverCredit": "Illustration: Fang Yuan; art by Liu Guanyi",
    "excerpt": "Fang Yuan’s knowledge changes the meaning of familiar faces, but it does not make the future certain.",
    "spoiler": "Contains spoilers through Chapter 2.",
    "body": [
      "<p>Fang Yuan remembers a lifetime that the people around him have not yet lived. His return places past relationships and future possibilities in the same scene, making even a familiar conversation carry two histories.</p>",
      "<h3>Knowledge is uneven</h3>",
      "<p>His memories can guide him toward people and opportunities, but remembering an event is different from controlling the circumstances that produce it. The closer he intervenes, the more important judgment becomes.</p>",
      "<h3>A useful reading question</h3>",
      "<p>When Fang Yuan reacts to a person, ask whether his response belongs to the present encounter or to what he remembers. The gap between those frames is one of the opening’s most productive sources of tension.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 2",
        "url": "/reader/chapter-2/"
      }
    ],
    "related": [
      "fang-yuan"
    ]
  },
  {
    "slug": "articles-righteous-demonic",
    "title": "Righteous and Demonic: Labels With Social Consequences",
    "author": "AI-assisted editorial draft",
    "dek": "The opening invites readers to examine what moral labels do as well as what they claim to describe.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Ideas",
      "Opening chapters"
    ],
    "cover": "/assets/inline/art-spring-autumn-cicada.webp",
    "coverCredit": "Illustration: Spring Autumn Cicada; art by mc人祖",
    "excerpt": "The opening invites readers to examine what moral labels do as well as what they claim to describe.",
    "spoiler": "Contains spoilers through Chapter 1.",
    "body": [
      "<p>Fang Yuan is introduced as a figure on the demonic path, facing opponents identified with righteous forces. The labels give the siege an immediate moral vocabulary, but they do not remove the need to judge what characters actually do.</p>",
      "<h3>Names and institutions</h3>",
      "<p>A label can express a belief, identify an affiliation or justify an action. In a struggle over resources and authority, the language used by a faction can also tell us how it wants its conduct understood.</p>",
      "<h3>Description is not endorsement</h3>",
      "<p>Following a ruthless protagonist does not require adopting his values. The tension between his viewpoint, the world’s labels and the harm done to others gives readers room for critical interpretation.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 1",
        "url": "/reader/chapter-1/"
      }
    ],
    "related": [
      "demonic-path"
    ]
  },
  {
    "slug": "articles-villain-protagonist",
    "title": "A Villain as the Main Character: Reading Without Endorsement",
    "author": "AI-assisted editorial draft",
    "dek": "The author’s preface offers a useful starting point for thinking about Fang Yuan’s role.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Ideas",
      "Context"
    ],
    "cover": "/assets/inline/art-spring-autumn-cicada.webp",
    "coverCredit": "Illustration: Spring Autumn Cicada; art by mc人祖",
    "excerpt": "The author’s preface offers a useful starting point for thinking about Fang Yuan’s role.",
    "spoiler": "Discusses the author’s preface.",
    "body": [
      "<p>In his preface, Gu Zhen Ren describes wanting to write a genuine villain rather than a convenient opponent who collapses before the hero. Fang Yuan’s opening gives that ambition a central viewpoint, not merely a place across the battlefield.</p>",
      "<h3>Perspective is not permission</h3>",
      "<p>A narrative can make a character compelling without asking readers to excuse their actions. Attention to Fang Yuan’s reasoning is different from agreement with the consequences his choices have for other people.</p>",
      "<h3>A productive discomfort</h3>",
      "<p>The story’s dark appeal lies partly in that separation. Readers can examine the logic of ambition, calculation and power while retaining their own moral judgment about what those things cost.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Author’s Preface",
        "url": "/reader/preface/"
      }
    ],
    "related": [
      "authors-preface"
    ]
  },
  {
    "slug": "articles-preface-author-intent",
    "title": "The Author’s Preface: The Villain He Wanted to Write",
    "author": "AI-assisted editorial draft",
    "dek": "A guide to the author’s own opening statement, separate from conclusions readers may draw from the novel.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Publication",
      "Context"
    ],
    "cover": "/assets/inline/ri-cover.jpg",
    "coverCredit": "Illustration: Gu Zhen Ren book cover",
    "excerpt": "A guide to the author’s own opening statement, separate from conclusions readers may draw from the novel.",
    "spoiler": "Discusses the author’s preface.",
    "body": [
      "<p>The author’s preface introduces the ambition behind Gu Zhen Ren: to write a villain unlike the disposable antagonists he had encountered in other fiction. It also connects the beginning of the project to a period of personal difficulty and uncertainty.</p>",
      "<h3>A statement of intent</h3>",
      "<p>The preface is a valuable primary source for what the author said he wanted to attempt. It is not, by itself, a complete explanation of every later character or a guarantee that every reader will share the same interpretation.</p>",
      "<h3>Where to begin</h3>",
      "<p>Read the preface alongside the opening chapter and compare the stated ambition with Fang Yuan’s first appearance. The contrast between an author’s promise and the work itself is a useful starting point for discussion.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Author’s Preface",
        "url": "/reader/preface/"
      }
    ],
    "related": [
      "authors-preface"
    ]
  },
  {
    "slug": "articles-first-chapter",
    "title": "Why the Novel Opens at the End of a Life",
    "author": "AI-assisted editorial draft",
    "dek": "A siege, a final decision and a return to youth make Chapter 1 an unusually compressed beginning.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Reading guide",
      "Opening chapters"
    ],
    "cover": "/assets/inline/qing-mao-mountain.webp",
    "coverCredit": "Illustration: Qing Mao Mountain; artist not credited",
    "excerpt": "A siege, a final decision and a return to youth make Chapter 1 an unusually compressed beginning.",
    "spoiler": "Contains spoilers through Chapter 1.",
    "body": [
      "<p>The opening introduces Fang Yuan when a long pursuit has apparently reached its end. Surrounded by enemies, he uses the Spring Autumn Cicada; the result carries the narrative back to his youth.</p>",
      "<h3>A finale before a beginning</h3>",
      "<p>Starting with the siege establishes scale before the book narrows to a village and a school. The reader sees the stakes of the older Fang Yuan’s life before learning how his younger self must move through the clan.</p>",
      "<h3>What to notice on a reread</h3>",
      "<p>Pay attention to the contrast between what the protagonist knows and what the scene can immediately explain. The opening is less a complete biography than a promise that the history behind him will influence every new choice.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 1",
        "url": "/reader/chapter-1/"
      }
    ],
    "related": [
      "chapter-1"
    ]
  },
  {
    "slug": "articles-first-eleven-chapters",
    "title": "A Reading Path Through the First Eleven Chapters",
    "author": "AI-assisted editorial draft",
    "dek": "From the siege to the first cultivation decisions, the opening moves from a vast life into a local struggle.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Reading guide",
      "Opening chapters"
    ],
    "cover": "/assets/inline/qing-mao-mountain.webp",
    "coverCredit": "Illustration: Qing Mao Mountain; artist not credited",
    "excerpt": "From the siege to the first cultivation decisions, the opening moves from a vast life into a local struggle.",
    "spoiler": "Contains spoilers through Chapter 11.",
    "body": [
      "<p>The first eleven chapters move from Fang Yuan’s rebirth to the Gu Yue Clan’s ceremony, academy and early cultivation choices. They introduce the central perspective before asking readers to absorb a much larger world.</p>",
      "<h3>Three movements</h3>",
      "<p>Start with the siege and return in Chapters 1–2. Then follow the household and clan setting into the aptitude ceremony in Chapters 4–6. The subsequent chapters connect the mountain, the academy and the first Gu decisions.</p>",
      "<h3>A practical way to follow along</h3>",
      "<p>Use the chapter guide after reading rather than treating it as a substitute for the prose. Keep track of what Fang Yuan remembers, what the clan expects and which resources each choice requires.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 11",
        "url": "/reader/chapter-11/"
      }
    ],
    "related": [
      "chapters"
    ]
  },
  {
    "slug": "articles-rebirth-and-regression",
    "title": "Rebirth Versus Transmigration: Two Different Journeys",
    "author": "AI-assisted editorial draft",
    "dek": "Fang Yuan’s premise involves both a passage between worlds and a return within one life.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Reading guide",
      "Opening chapters"
    ],
    "cover": "/assets/inline/qing-mao-mountain.webp",
    "coverCredit": "Illustration: Qing Mao Mountain; artist not credited",
    "excerpt": "Fang Yuan’s premise involves both a passage between worlds and a return within one life.",
    "spoiler": "Contains spoilers through Chapter 1.",
    "body": [
      "<p>The opening identifies Fang Yuan as someone who came from Earth into the Gu world. The Spring Autumn Cicada then sends him back through his own Gu-world life, to an earlier point on Qing Mao Mountain.</p>",
      "<h3>Two movements, not one</h3>",
      "<p>Transmigration describes the movement between worlds. Rebirth in the opening describes the return to a younger point in his life in the Gu world. Keeping the terms distinct helps make sense of which memories he carries.</p>",
      "<h3>Why the distinction matters</h3>",
      "<p>His outlook is shaped by more than one setting and by a long intervening life. The premise is not simply that a modern person wakes up in a fantasy world; it also asks what happens when an experienced survivor begins again.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 1",
        "url": "/reader/chapter-1/"
      }
    ],
    "related": [
      "fang-yuan"
    ]
  },
  {
    "slug": "articles-gu-living-power",
    "title": "Gu Are Living Power, Not Just Spells",
    "author": "AI-assisted editorial draft",
    "dek": "The novel’s magic becomes more concrete when abilities are treated as creatures that must be managed.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Gu",
      "Opening chapters"
    ],
    "cover": "/assets/inline/art-spring-autumn-cicada.webp",
    "coverCredit": "Illustration: Spring Autumn Cicada; art by mc人祖",
    "excerpt": "The novel’s magic becomes more concrete when abilities are treated as creatures that must be managed.",
    "spoiler": "Contains spoilers through Chapter 8.",
    "body": [
      "<p>Gu are central to the world’s cultivation: Gu Masters nurture, refine and use them. In the opening, learning about Gu means learning about particular creatures and the resources needed to work with them.</p>",
      "<h3>Abilities with practical demands</h3>",
      "<p>A Gu is not simply an abstract ability written on a character sheet. Different Gu create different possibilities, and the process of acquiring and refining one gives power a material history.</p>",
      "<h3>Strategy starts before a fight</h3>",
      "<p>Choices about resources and preparation matter before an ability is ever used. The Moonlight Gu and Liquor Worm illustrate how a familiar clan option and a less conventional opportunity can lead to different calculations.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 8",
        "url": "/reader/chapter-8/"
      }
    ],
    "related": [
      "gu"
    ]
  },
  {
    "slug": "articles-clan-and-individual",
    "title": "Fang Yuan Versus the Clan: An Uneasy Bargain",
    "author": "AI-assisted editorial draft",
    "dek": "The opening conflict is not simply independence against authority; the protagonist also needs what the clan provides.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Ideas",
      "Opening chapters"
    ],
    "cover": "/assets/inline/art-spring-autumn-cicada.webp",
    "coverCredit": "Illustration: Spring Autumn Cicada; art by mc人祖",
    "excerpt": "The opening conflict is not simply independence against authority; the protagonist also needs what the clan provides.",
    "spoiler": "Contains spoilers through Chapter 8.",
    "body": [
      "<p>Fang Yuan’s goals do not neatly align with the expectations of the Gu Yue Clan. Yet his early opportunities are inseparable from its institutions: a village, an academy, cultivation knowledge and social rules.</p>",
      "<h3>Dependence and resistance</h3>",
      "<p>A person may reject a community’s values while still relying on its resources. That dependence makes the relationship more complicated than a simple story of leaving an oppressive system behind.</p>",
      "<h3>Watch the negotiation</h3>",
      "<p>The interesting question is often not whether Fang Yuan accepts or rejects the clan, but how he moves within it. His choices reveal both the opportunities the institution offers and the limits it imposes.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 8",
        "url": "/reader/chapter-8/"
      }
    ],
    "related": [
      "gu-yue-clan"
    ]
  },
  {
    "slug": "articles-flower-wine-monk",
    "title": "The Flower-Wine Monk and the Appeal of an Inheritance",
    "author": "AI-assisted editorial draft",
    "dek": "An old story becomes a lead when Fang Yuan remembers what others have overlooked.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Worldbuilding",
      "Opening chapters"
    ],
    "cover": "/assets/inline/qing-mao-mountain.webp",
    "coverCredit": "Illustration: Qing Mao Mountain; artist not credited",
    "excerpt": "An old story becomes a lead when Fang Yuan remembers what others have overlooked.",
    "spoiler": "Contains spoilers through Chapter 7.",
    "body": [
      "<p>The Flower-Wine Monk enters the opening as a figure connected with a hidden opportunity on Qing Mao Mountain. Fang Yuan’s memories attach practical significance to an account that might otherwise remain part of local history.</p>",
      "<h3>Stories as information</h3>",
      "<p>A tale about an earlier Gu Master is not just atmosphere. In a world where resources and techniques can be passed on or concealed, knowing what a story points toward can alter the choices available in the present.</p>",
      "<h3>The gap between clue and reward</h3>",
      "<p>An inheritance is not automatically possession. Finding a lead, reaching it and making use of what it offers are separate problems. The distinction keeps the promise of discovery tied to practical risk.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 7",
        "url": "/reader/chapter-7/"
      }
    ],
    "related": [
      "flower-wine-monk"
    ]
  },
  {
    "slug": "articles-gu-world-economy",
    "title": "The Gu World Runs on Scarcity",
    "author": "AI-assisted editorial draft",
    "dek": "The opening’s resources make ambition a material problem, not just a declaration of will.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Ideas",
      "Opening chapters"
    ],
    "cover": "/assets/inline/art-spring-autumn-cicada.webp",
    "coverCredit": "Illustration: Spring Autumn Cicada; art by mc人祖",
    "excerpt": "The opening’s resources make ambition a material problem, not just a declaration of will.",
    "spoiler": "Contains spoilers through Chapter 11.",
    "body": [
      "<p>Cultivation in the opening depends on limited things: aptitude, primeval essence, stones, Gu and access to training. Fang Yuan’s ambitions encounter these constraints almost immediately after his return.</p>",
      "<h3>Resources create relationships</h3>",
      "<p>A clan can support promising youths because it controls resources, but allocating those resources also gives it power over them. A choice that seems personal may therefore depend on family position and institutional approval.</p>",
      "<h3>Strategy under limits</h3>",
      "<p>Scarcity makes plans interesting because there is an opportunity cost. A reader can ask not only what a character wants, but what they must spend, risk or forgo in order to pursue it.</p>"
    ],
    "sources": [
      {
        "label": "The Omniarch Translations — Chapter 11",
        "url": "/reader/chapter-11/"
      }
    ],
    "related": [
      "primeval-stones"
    ]
  },
  {
    "slug": "articles-official-comic",
    "title": "The Official Comic and Kodoku’s Fan Remake: Know the Difference",
    "author": "AI-assisted editorial draft",
    "dek": "Two comics offer different routes into the opening; one is an official adaptation and the other a fan project.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Adaptations",
      "Context"
    ],
    "cover": "/assets/inline/ri-cover.jpg",
    "coverCredit": "Illustration: Gu Zhen Ren book cover",
    "excerpt": "Two comics offer different routes into the opening; one is an official adaptation and the other a fan project.",
    "spoiler": "External sources may contain later-story spoilers.",
    "body": [
      "<p>Reverend Insanity has an official comic adaptation associated with Ranhui Culture and available on Webnovel. Kodoku Studio also publishes a separate fan-made remake. They should not be treated as the same production.</p>",
      "<h3>What each link tells you</h3>",
      "<p>Webnovel’s comic listing identifies its own adaptation and credits. Kodoku’s project page presents the studio’s remake. Availability, chapter numbering and translation can differ between platforms, so check the project page rather than assuming equivalence.</p>",
      "<h3>Reading across formats</h3>",
      "<p>A comic adapts prose into images and pacing; it does not reproduce every sentence or interior thought. Treat both as interpretations of the opening and return to the novel when comparing the details.</p>"
    ],
    "sources": [
      {
        "label": "Webnovel — Reverend Insanity comic",
        "url": "https://www.webnovel.com/comic/reverend-insanity_16914029906866101"
      },
      {
        "label": "Kodoku Studio — fan manhua",
        "url": "https://kodokustudio.com/manhua/reverend-insanity-manhwa-en/"
      }
    ],
    "related": [
      "adaptations"
    ]
  },
  {
    "slug": "articles-translations-and-names",
    "title": "Why Reverend Insanity Has More Than One English Name",
    "author": "AI-assisted editorial draft",
    "dek": "Different translations and listings can use different titles and terms for the same work.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Publication",
      "Context"
    ],
    "cover": "/assets/inline/ri-cover.jpg",
    "coverCredit": "Illustration: Gu Zhen Ren book cover",
    "excerpt": "Different translations and listings can use different titles and terms for the same work.",
    "spoiler": "External sources may contain later-story spoilers.",
    "body": [
      "<p>The novel’s original Chinese title is 蛊真人, commonly rendered as Gu Zhen Ren. English-language listings also use names including Reverend Insanity and Gu Daoist Master. The author’s pen name is likewise Gu Zhen Ren.</p>",
      "<h3>Titles and terminology</h3>",
      "<p>A translated title is an editorial choice rather than a second novel. Names for Gu, ranks and places may also vary by edition, so a term in one translation should not automatically be treated as an error in another.</p>",
      "<h3>A useful comparison</h3>",
      "<p>When discussing a passage, identify the edition and chapter as well as the term. This encyclopedia follows its linked reader’s terminology, while other versions remain valuable reference points for comparison.</p>"
    ],
    "sources": [
      {
        "label": "Webnovel — Reverend Insanity",
        "url": "https://www.webnovel.com/book/reverend-insanity_7996858406002505"
      },
      {
        "label": "Novel Updates — alternate titles and translation details",
        "url": "https://www.novelupdates.com/series/reverend-insanity/"
      }
    ],
    "related": [
      "reverend-insanity"
    ]
  },
  {
    "slug": "articles-reading-the-community",
    "title": "A Reader’s Guide to the Reverend Insanity Community",
    "author": "AI-assisted editorial draft",
    "dek": "Find fan art, discussion and adaptations while keeping sources, credits and spoilers in view.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Community",
      "Context"
    ],
    "cover": "/assets/inline/art-gu-zhen-ren.webp",
    "coverCredit": "Illustration: Gu Zhen Ren; art by mc人祖",
    "excerpt": "Find fan art, discussion and adaptations while keeping sources, credits and spoilers in view.",
    "spoiler": "External sources may contain later-story spoilers.",
    "body": [
      "<p>The community extends beyond the novel into artwork, commentary, comics and reader discussions. The encyclopedia’s Community Hub gathers links to independent projects and spaces rather than presenting them all as official productions.</p>",
      "<h3>Check the context</h3>",
      "<p>A fan-made comic, an official platform listing and a reader’s video serve different purposes. Check who produced a work and whether it is an adaptation, interpretation or source before sharing a claim about it.</p>",
      "<h3>Share thoughtfully</h3>",
      "<p>Many community spaces discuss events far beyond the opening chapters. Mark spoilers, credit artists when possible and link to the original creator rather than assuming a repost identifies the work correctly.</p>"
    ],
    "sources": [
      {
        "label": "Community Hub",
        "url": "/wiki/community/"
      }
    ],
    "related": [
      "community"
    ]
  },
  {
    "slug": "articles-five-regions",
    "title": "Beyond Qing Mao: A Guide to the Five Regions",
    "author": "AI-assisted editorial draft",
    "dek": "The Gu world opens into five major regions, each with its own geography and centers of power.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Worldbuilding",
      "Later story"
    ],
    "cover": "/assets/inline/art-five-regions.webp",
    "coverCredit": "Illustration: the Five Regions; art by 瑞光Pro",
    "excerpt": "The Gu world opens into five major regions, each with its own geography and centers of power.",
    "spoiler": "Contains major later-story spoilers; linked fan sources reveal plot outcomes.",
    "body": [
      "<p>Qing Mao Mountain is an introduction, not the whole map. Beyond the Southern Border lie the Central Continent, Northern Plains, Western Desert and Eastern Sea. The larger geography changes the scale of the story from a local clan’s struggles to contests spanning different societies.</p>",
      "<h3>A map is not a plot summary</h3>",
      "<p>The names give readers a way to orient themselves, but each region contains more than a single faction or landscape. Thinking of the regions as separate centers of history and power helps avoid treating the world as one uniform cultivation society.</p>",
      "<h3>For readers going further</h3>",
      "<p>Regional boundaries and the difficulties of crossing them matter in later conflicts. The linked fan reference discusses developments well beyond this site’s early chapters, so approach it as a spoiler-heavy guide rather than a beginner’s glossary.</p>"
    ],
    "sources": [
      {
        "label": "Reverend Insanity Wiki (fan reference; major spoilers)",
        "url": "https://reverend-insanity.fandom.com/wiki/Gu_World"
      }
    ],
    "related": []
  },
  {
    "slug": "articles-venerables",
    "title": "What Is a Venerable in Reverend Insanity?",
    "author": "AI-assisted editorial draft",
    "dek": "Rank nine represents the peak of cultivation and leaves an imprint on the world’s history.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Power and history",
      "Later story"
    ],
    "cover": "/assets/inline/art-gu-zhen-ren.webp",
    "coverCredit": "Illustration: Gu Zhen Ren; art by mc人祖",
    "excerpt": "Rank nine represents the peak of cultivation and leaves an imprint on the world’s history.",
    "spoiler": "Contains major later-story spoilers; linked fan sources reveal plot outcomes.",
    "body": [
      "<p>Venerables are rank-nine Gu Immortals whose eras, legacies and competing designs form an important part of the novel’s wider history. Their influence is not limited to direct appearances: later readers encounter inheritances and institutions shaped by figures from earlier ages.</p>",
      "<h3>Power with a history</h3>",
      "<p>A venerable is more than a number on a scale. Learning who established an institution or left an inheritance can change how an apparently isolated event is understood. Their different paths also connect individual power to distinct traditions of cultivation.</p>",
      "<h3>Keep the timeline in mind</h3>",
      "<p>The novel reveals this history gradually, and summaries often compress events from different eras. The linked fan reference contains major revelations; it is best read only when you are comfortable with later-story information.</p>"
    ],
    "sources": [
      {
        "label": "Reverend Insanity Wiki (fan reference; major spoilers)",
        "url": "https://reverend-insanity.fandom.com/wiki/Venerable"
      }
    ],
    "related": []
  },
  {
    "slug": "articles-heavenly-court",
    "title": "Heavenly Court: An Institution Built for the Long Game",
    "author": "AI-assisted editorial draft",
    "dek": "The powerful Central Continent organization brings history, authority and competing visions of order into focus.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Factions",
      "Later story"
    ],
    "cover": "/assets/inline/art-five-regions.webp",
    "coverCredit": "Illustration: the Five Regions; art by 瑞光Pro",
    "excerpt": "The powerful Central Continent organization brings history, authority and competing visions of order into focus.",
    "spoiler": "Contains major later-story spoilers; linked fan sources reveal plot outcomes.",
    "body": [
      "<p>Heavenly Court is a major Gu Immortal organization associated with the Central Continent. Its importance rests not only on powerful members but also on a long institutional history and a sense of responsibility for humanity’s future.</p>",
      "<h3>An institution, not one character</h3>",
      "<p>Its goals and methods are best understood through its leaders, resources and historical claims together. A conflict involving Heavenly Court is therefore also a conflict over the authority of an enduring organization to shape the world.</p>",
      "<h3>A caution for new readers</h3>",
      "<p>Accounts of Heavenly Court frequently reveal much later events and character outcomes. This overview deliberately avoids a battle-by-battle account; the fan reference below is substantially more detailed and contains major spoilers.</p>"
    ],
    "sources": [
      {
        "label": "Reverend Insanity Wiki (fan reference; major spoilers)",
        "url": "https://reverend-insanity.fandom.com/wiki/Heavenly_Court"
      }
    ],
    "related": []
  },
  {
    "slug": "articles-fate-gu",
    "title": "Fate Gu and the Question of Who Chooses",
    "author": "AI-assisted editorial draft",
    "dek": "A later-story Gu turns the conflict between predetermined paths and individual ambition into a world-scale question.",
    "date": "2026-11-15",
    "dateLabel": "November 15, 2026",
    "tags": [
      "Ideas",
      "Later story"
    ],
    "cover": "/assets/inline/art-spring-autumn-cicada.webp",
    "coverCredit": "Illustration: Spring Autumn Cicada, not Fate Gu; art by mc人祖",
    "excerpt": "A later-story Gu turns the conflict between predetermined paths and individual ambition into a world-scale question.",
    "spoiler": "Contains major later-story spoilers; linked fan sources reveal plot outcomes.",
    "body": [
      "<p>Fate Gu becomes central to a later conflict in Reverend Insanity. It connects the idea of fate to a concrete Gu and to the institutions that seek to protect or challenge its role in the world.</p>",
      "<h3>A philosophical question with material stakes</h3>",
      "<p>Stories about destiny often ask whether individuals can choose differently. Here that question also concerns a living Gu and the power of those who act around it. The argument is therefore political and practical as well as philosophical.</p>",
      "<h3>Reading past the slogan</h3>",
      "<p>Freedom and order mean different things to different participants, and the consequences of their choices are not limited to one character. Avoid reducing the conflict to a single inspirational phrase; the linked fan reference explains later events and their outcomes in detail.</p>"
    ],
    "sources": [
      {
        "label": "Reverend Insanity Wiki (fan reference; major spoilers)",
        "url": "https://reverend-insanity.fandom.com/wiki/Fate_Gu"
      }
    ],
    "related": []
  }
]);
(function(){
  var A = window.OMNIARCH_ARTICLES;
  if(!A) return;
  function stripHtml(s){ return String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim(); }
  window.OMNIARCH_NEWS.forEach(function(n){
    A[n.slug] = {
      t: n.title,
      k: 'Article',
      ib: [],
      see: n.related || [],
      cat: [],
      b: [n.excerpt || n.dek || ''].concat((n.body||[]).map(stripHtml)),
      news: n
    };
  });
  if(!A['articles']) A['articles'] = {
    t: 'Articles',
    k: 'Index',
    ib: [], see: [], cat: [],
    index: 'news-portal',
    b: ['Dispatches, investigations and long reads from the encyclopedia desk \u2014 misattributed fan art, community mix-ups, and anything else about Reverend Insanity\u2019s fandom worth a proper writeup.']
  };
})();
