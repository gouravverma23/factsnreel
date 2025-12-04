export const posts = [
    {
        id: 1,
        title: "10 Mind-Blowing Facts About Space",
        // image: "https://placehold.co/600x400/222831/EEEEEE?text=Space+Facts",
        image: "https://i.pinimg.com/1200x/68/1b/88/681b888e8876ce6622ffac0d9acaf52e.jpg",
        description: "Did you know that a day on Venus is longer than a year on Venus? Discover more amazing space facts.",
        topic: "Astronomy",
        subtopics: ["Planetary Physics", "Cosmic Mysteries"],
        content: [
            {
                type: 'heading',
                text: "The Mysteries of Venus"
            },
            {
                type: 'paragraph',
                text: "Space is vast and filled with wonders that defy our understanding. One of the most intriguing facts is about Venus. A day on Venus (one rotation on its axis) takes 243 Earth days, while a year on Venus (one orbit around the Sun) takes only 225 Earth days."
            },
            {
                type: 'image',
                src: "https://images.unsplash.com/photo-1614730341194-75c60740a2d3?q=80&w=1000&auto=format&fit=crop",
                alt: "Venus Planet",
                caption: "Venus, the second planet from the Sun."
            },
            {
                type: 'ad'
            },
            {
                type: 'subheading',
                text: "Cosmic Scale"
            },
            {
                type: 'paragraph',
                text: "Another mind-blowing fact is that there are more stars in the universe than grains of sand on all the beaches on Earth. The observable universe is estimated to contain between 10^22 and 10^24 stars."
            },
            {
                type: 'link',
                text: "Read more about the Universe scale",
                url: "https://nasa.gov"
            },
            {
                type: 'list',
                items: [
                    "Neutron stars can spin at a rate of 600 rotations per second.",
                    "Space is completely silent because there is no atmosphere to carry sound.",
                    "A full NASA space suit costs $12,000,000.",
                    "The Sun makes up 99.8% of our entire solar system’s mass.",
                    "There are more stars in the universe than grains of sand on all Earth’s beaches combined.",
                    "A neutron star is incredibly dense. Just a teaspoon of its material would weigh more than every human on Earth combined.",
                    "There’s no air to carry sound, so space has no sound — total silence. Even explosions make no noise.",
                    "Sagittarius B2, a massive molecular cloud, contains ethyl formate, the chemical that gives rum its smell and raspberries their flavor.",
                    "The rest is 27% dark matter and 68% dark energy — mysterious substances we still don’t fully understand.",
                    "55 Cancri e is a “super-Earth” believed to contain diamond layers due to its carbon-rich composition and massive pressure."
                ]
            }
        ],
        references: [
            { text: "NASA - Venus Facts", url: "https://solarsystem.nasa.gov/planets/venus/overview/" },
            { text: "National Geographic - Space", url: "https://www.nationalgeographic.com/science/space/" }
        ]
    },
    {
        id: 2,
        title: "The Psychology of Color in Marketing",
        // image: "https://placehold.co/600x400/393E46/FFD369?text=Color+Psychology",
        image: "https://i.pinimg.com/736x/45/50/21/455021cc2284ae47ce29c3fe3872e754.jpg",
        description: "How brands use color to influence your decisions. A deep dive into color theory.",
        topic: "Marketing",
        subtopics: ["Consumer Behavior", "Branding"],
        content: [
            {
                type: 'paragraph',
                text: "Color plays a pivotal role in marketing and branding. It can influence consumer emotions and perceptions of a brand. For example, red is often used to create a sense of urgency, while blue evokes trust and security."
            },
            {
                type: 'paragraph',
                text: "Understanding color psychology helps marketers craft messages that resonate with their target audience on a subconscious level."
            },
            {
                type: 'list',
                items: [
                    "Red: Excitement, passion, danger, energy, and action.",
                    "Blue: Trust, security, calmness, and peace.",
                    "Green: Nature, growth, health, and money."
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Top 5 Productivity Hacks for 2024",
        // image: "https://placehold.co/600x400/FFD369/222831?text=Productivity",
        image: "https://i.pinimg.com/1200x/22/84/46/2284467637eb258a1e79efd137a78d3a.jpg",
        description: "Boost your efficiency with these simple yet effective techniques used by top performers.",
        topic: "Self Improvement",
        subtopics: ["Time Management", "Focus"],
        content: [
            {
                type: 'paragraph',
                text: "In a world filled with distractions, staying productive is a superpower. One effective method is the Pomodoro Technique, which involves working for 25 minutes and then taking a 5-minute break."
            },
            {
                type: 'paragraph',
                text: "Another key strategy is 'Eat That Frog', which means tackling your most difficult task first thing in the morning."
            },
            {
                type: 'list',
                items: [
                    "The Pomodoro Technique: Work 25 mins, break 5 mins.",
                    "Time Blocking: Schedule specific blocks of time for specific tasks.",
                    "The 2-Minute Rule: If it takes less than 2 mins, do it now."
                ]
            }
        ]
    },
    {
        id: 4,
        title: "The History of the Internet",
        // image: "https://placehold.co/600x400/222831/FFD369?text=Internet+History",
        image: "https://i.pinimg.com/736x/40/39/70/4039703514eda25cbb04d843fbbfbf1f.jpg",
        description: "From ARPANET to the World Wide Web. A journey through the digital revolution.",
        topic: "Technology",
        subtopics: ["Networking", "Digital Evolution"],
        content: [
            {
                type: 'paragraph',
                text: "The internet started as a project called ARPANET in the late 1960s, funded by the US Department of Defense. It was designed to allow computers to communicate with each other over long distances."
            },
            {
                type: 'paragraph',
                text: "In 1989, Tim Berners-Lee invented the World Wide Web, which revolutionized how we access and share information."
            },
            {
                type: 'list',
                items: [
                    "1969: First message sent over ARPANET.",
                    "1989: World Wide Web invented.",
                    "1991: First website goes live."
                ]
            }
        ]
    },
    {
        id: 5,
        title: "Why Do We Dream?",
        // image: "https://placehold.co/600x400/393E46/EEEEEE?text=Dreams",
        image: "https://i.pinimg.com/736x/58/c9/e0/58c9e03dccbfe81f1322b386ae4224c2.jpg",
        description: "Exploring the scientific theories behind why we dream and what they might mean.",
        topic: "Psychology",
        subtopics: ["Neuroscience", "Sleep Studies"],
        content: [
            {
                type: 'paragraph',
                text: "Dreams have fascinated humans for centuries. While the exact purpose of dreaming is still debated, theories suggest it helps with memory consolidation, emotional processing, and problem-solving."
            },
            {
                type: 'paragraph',
                text: "REM sleep is the stage where most vivid dreaming occurs. During this phase, brain activity is similar to being awake."
            },
            {
                type: 'list',
                items: [
                    "Activation-Synthesis Theory: Dreams are the brain's attempt to make sense of random neural activity.",
                    "Threat Simulation Theory: Dreams allow us to practice handling threatening situations.",
                    "Memory Consolidation: Dreams help process and store memories."
                ]
            }
        ]
    },
    {
        id: 6,
        title: "The Future of Artificial Intelligence",
        // image: "https://placehold.co/600x400/FFD369/393E46?text=AI+Future",
        image: "https://i.pinimg.com/1200x/cf/e3/8f/cfe38fd08eed52e91ea9b5d332913599.jpg",
        description: "What lies ahead for AI? Predictions and possibilities for the next decade.",
        topic: "Technology",
        subtopics: ["Machine Learning", "Robotics"],
        content: [
            {
                type: 'paragraph',
                text: "Artificial Intelligence is rapidly evolving. In the next decade, we can expect AI to become even more integrated into our daily lives, from autonomous vehicles to personalized healthcare."
            },
            {
                type: 'paragraph',
                text: "However, the rise of AI also brings ethical challenges, such as job displacement and privacy concerns."
            },
            {
                type: 'list',
                items: [
                    "AGI (Artificial General Intelligence): AI with human-level intelligence.",
                    "AI in Healthcare: Early disease detection and personalized treatment.",
                    "Ethical AI: Ensuring fairness and transparency in AI systems."
                ]
            }
        ]
    },
    {
        id: 7,
        title: "How to Learn Anything Faster",
        image: "https://i.pinimg.com/736x/c6/de/95/c6de95d83a92f98e0095b9fa81d7c889.jpg",
        description: "Smart, science-backed ways to learn faster, remember longer, and understand deeper.",
        topic: "Learning",
        subtopics: ["Brain Science", "Self-Improvement"],

        content: [
            {
                type: 'heading',
                text: "Unlock Faster Learning"
            },
            {
                type: 'paragraph',
                text:
                    "Learning quickly isn’t about studying for long hours — it's about studying the right way. " +
                    "Your brain forms memories through repetition, emotion, and active engagement. " +
                    "Use these principles, and you can learn anything faster than before."
            },

            {
                type: 'subheading',
                text: "Active Learning Over Passive Watching"
            },
            {
                type: 'paragraph',
                text:
                    "Most people read or watch videos and expect to remember. " +
                    "But passive learning creates weak memory connections. " +
                    "When you interact with the information — explain it, write it, or test yourself — the brain builds stronger pathways."
            },

            {
                type: 'list',
                items: [
                    "Explain what you learned in simple words.",
                    "Ask yourself questions instead of rereading.",
                    "Convert lessons into small actionable steps."
                ]
            },

            {
                type: 'subheading',
                text: "Train Your Brain with Spaced Practice"
            },
            {
                type: 'paragraph',
                text:
                    "Cramming feels productive, but the brain forgets most of it. " +
                    "Spaced repetition works with your natural memory cycle, strengthening recall every time you revisit the topic."
            },

            {
                type: 'list',
                items: [
                    "Review after 24 hours.",
                    "Review again after 3 days.",
                    "Review again after a week."
                ]
            },

            {
                type: 'heading',
                text: "Turn Knowledge Into Skill"
            },
            {
                type: 'paragraph',
                text:
                    "Your brain learns faster when you apply information immediately. " +
                    "Practice transforms theory into real understanding — and makes knowledge automatic."
            },

            {
                type: 'subheading',
                text: "Simple Habits That Boost Learning Speed"
            },
            {
                type: 'list',
                items: [
                    "Study in 25–30 minute deep-focus blocks.",
                    "Use handwritten notes to boost memory.",
                    "Avoid multitasking — it breaks concentration.",
                    "Sleep right after learning to lock in new memories.",
                    "Use visuals and analogies to simplify complex topics."
                ]
            }
        ]
    },
    {
        id: 8,
        title: "Why We Procrastinate & How to Beat It",
        image: "https://i.pinimg.com/1200x/13/9f/c1/139fc1206d80a02a0fbc529dc6237cdf.jpg",
        description: "Understand the real reason behind procrastination and learn simple habits to break it.",
        topic: "Psychology",
        subtopics: ["Behavior", "Self-Improvement"],

        content: [
            {
                type: 'heading',
                text: "The Real Reason We Procrastinate"
            },
            {
                type: 'paragraph',
                text:
                    "Procrastination isn’t about laziness — it's a stress and emotion problem. " +
                    "When a task feels boring, difficult, or uncertain, your brain tries to protect you by avoiding it. " +
                    "This temporary relief becomes a habit that keeps pulling you back."
            },
            {
                type: 'image',
                src: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop",
                alt: "Procrastination",
                caption: "Don't let time slip away."
            },
            {
                type: 'ad'
            },
            {
                type: 'subheading',
                text: "Your Brain Chooses Comfort"
            },
            {
                type: 'paragraph',
                text:
                    "The brain prefers quick rewards over long-term gains. " +
                    "That’s why scrolling, watching videos, or chatting feels easier than starting a tough task. " +
                    "Understanding this helps you control it instead of fighting yourself blindly."
            },
            {
                type: 'link',
                text: "Learn more about Procrastination Psychology",
                url: "https://www.psychologytoday.com/us/basics/procrastination"
            },
            {
                type: 'list',
                items: [
                    "Tasks with unclear steps feel harder.",
                    "Fear of not doing it perfectly causes delay.",
                    "Too much workload triggers shutdown.",
                    "Low energy or boredom pushes you to distractions."
                ]
            },

            {
                type: 'heading',
                text: "Break Procrastination with Simple Fixes"
            },
            {
                type: 'paragraph',
                text:
                    "You don’t need big motivation — just small systems. " +
                    "The trick is to make tasks feel lighter and easier to start."
            },

            {
                type: 'subheading',
                text: "Practical Ways to Beat It"
            },
            {
                type: 'list',
                items: [
                    "Break the task into the smallest possible step.",
                    "Use the 5-minute rule — commit to only five minutes.",
                    "Remove distractions from your desk before you begin.",
                    "Reward yourself after finishing small portions.",
                    "Work in short focus blocks (25 minutes)."
                ]
            },

            {
                type: 'subheading',
                text: "Shift Your Mindset"
            },
            {
                type: 'paragraph',
                text:
                    "Don’t aim for perfect — aim to start. " +
                    "Momentum creates motivation, not the other way around. " +
                    "Once you begin, your brain naturally enters focus mode."
            }
        ],
        references: [
            { text: "Psychology Today - Procrastination", url: "https://www.psychologytoday.com/us/basics/procrastination" },
            { text: "James Clear - Procrastination", url: "https://jamesclear.com/procrastination" }
        ]
    }


];
