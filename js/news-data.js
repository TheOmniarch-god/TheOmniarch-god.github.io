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
