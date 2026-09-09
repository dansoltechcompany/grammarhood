import type { RuleExample } from "../lib/types";

export type TopicCard = {
  examples: RuleExample[];
  watchFor: string;
};

const pair = (yes: string, no: string): RuleExample => ({ yes, no });

export const TOPIC_CARDS: Record<string, TopicCard> = {
  "a-an-the": {
    watchFor: "Listen to the first sound, not the first letter: an hour, a university.",
    examples: [
      pair("She bought an umbrella.", "She bought a umbrella."),
      pair("I have a dog.", "I have an dog."),
      pair("Can you close the window?", "Can you close a window? (if you both mean this one)"),
      pair("I saw a film. The film was long.", "I saw a film. A film was long."),
    ],
  },
  "am-is-are": {
    watchFor: "He, she, and it take is — never are.",
    examples: [
      pair("She is a teacher.", "She are a teacher."),
      pair("I am ready.", "I is ready."),
      pair("They are at the station.", "They is at the station."),
    ],
  },
  "present-simple-vs-continuous": {
    watchFor: "Habits and facts stay in present simple, even if you say them now.",
    examples: [
      pair("She usually drinks coffee.", "She usually is drinking coffee."),
      pair("Right now she is drinking tea.", "Right now she drinks tea. (if you mean this moment)"),
      pair("Water boils at 100°C.", "Water is boiling at 100°C. (as a fact)"),
    ],
  },
  "past-simple": {
    watchFor: "After did, the main verb stays in the base form: did you go, not did you went.",
    examples: [
      pair("I went to work yesterday.", "I goed to work yesterday."),
      pair("Did you go to work yesterday?", "Did you went to work yesterday?"),
      pair("She watched the match last night.", "She watch the match last night."),
    ],
  },
  "subject-object-pronouns": {
    watchFor: "After a verb or a preposition, use me, him, her, us, them — not I, he, she.",
    examples: [
      pair("She called me.", "She called I."),
      pair("They sat next to us.", "They sat next to we."),
      pair("I emailed him this morning.", "I emailed he this morning."),
    ],
  },
  "prepositions-of-place": {
    watchFor: "At is a point (at the door, at home). In is a space. On is a surface.",
    examples: [
      pair("The keys are on the table.", "The keys are in the table."),
      pair("She is in the kitchen.", "She is on the kitchen."),
      pair("I'll meet you at the station.", "I'll meet you in the station. (if you mean the meeting point)"),
    ],
  },
  "prepositions-of-time": {
    watchFor: "On Monday, in June, at 9 — do not mix those three.",
    examples: [
      pair("The meeting is on Monday at 9.", "The meeting is in Monday at 9."),
      pair("She was born in 1998.", "She was born on 1998."),
      pair("He works at night.", "He works in night."),
    ],
  },
  "there-is-there-are": {
    watchFor: "The verb agrees with the noun after there, not with the word there.",
    examples: [
      pair("There are two chairs in the kitchen.", "There is two chairs in the kitchen."),
      pair("There is a message for you.", "There are a message for you."),
      pair("Is there any milk left?", "Are there any milk left?"),
    ],
  },
  "comparatives-superlatives": {
    watchFor: "After a comparative use than, not that. Superlatives need the.",
    examples: [
      pair("This bag is cheaper than that one.", "This bag is cheaper that that one."),
      pair("This is the most expensive option.", "This is most expensive option."),
      pair("The office is quieter than the café.", "The office is more quieter than the café."),
    ],
  },
  "present-perfect-vs-past-simple": {
    watchFor: "A finished date (in 2019, yesterday) needs past simple, not present perfect.",
    examples: [
      pair("I visited Paris in 2019.", "I have visited Paris in 2019."),
      pair("I have visited Paris three times.", "I visited Paris three times. (if you mean life experience up to now)"),
      pair("She lost her keys yesterday.", "She has lost her keys yesterday."),
    ],
  },
  "present-simple": {
    watchFor: "After does, keep the base verb: does she work, not does she works.",
    examples: [
      pair("Does she work on Mondays?", "Does she works on Mondays?"),
      pair("She lives near the office.", "She live near the office."),
      pair("They don't start until 9.", "They doesn't start until 9."),
    ],
  },
  "present-continuous": {
    watchFor: "You need am, is, or are plus -ing. Do not drop the helping verb.",
    examples: [
      pair("They are waiting outside.", "They waiting outside."),
      pair("I am sending the email now.", "I sending the email now."),
      pair("She isn't coming to the meeting.", "She not coming to the meeting."),
    ],
  },
  "past-continuous": {
    watchFor: "Use was/were + -ing for a background action, not for a short finished event.",
    examples: [
      pair("At 7 I was cooking.", "At 7 I cooked dinner still."),
      pair("They were waiting when I arrived.", "They waited when I arrived. (if you mean the wait was already in progress)"),
      pair("I wasn't sleeping at midnight.", "I didn't sleeping at midnight."),
    ],
  },
  "past-simple-vs-past-continuous": {
    watchFor: "The long background is past continuous; the interruption is past simple.",
    examples: [
      pair("I was cooking when the phone rang.", "I cooked when the phone was ringing."),
      pair("She was leaving as the email arrived.", "She left as the email was arriving. (if the leaving was already in progress)"),
      pair("We were talking when the lights went out.", "We talked when the lights were going out."),
    ],
  },
  "present-perfect": {
    watchFor: "He, she, and it take has, not have: she has eaten.",
    examples: [
      pair("She has already eaten.", "She have already eaten."),
      pair("They have gone home.", "They has gone home."),
      pair("Have you seen this file?", "Has you seen this file?"),
    ],
  },
  "will-vs-going-to": {
    watchFor: "Evidence you can see now (those clouds) usually takes going to, not a random will.",
    examples: [
      pair("Look at those clouds — it is going to rain.", "Look at those clouds — it will raining."),
      pair("I'm thirsty. I will get some water.", "I'm thirsty. I am going to get some water. (if you decided this second)"),
      pair("We are going to move in June. It's booked.", "We will move in June. It's booked. (if the plan is already fixed)"),
    ],
  },
  "going-to": {
    watchFor: "The shape is am/is/are + going to + base. Do not drop am/is/are.",
    examples: [
      pair("I am going to call her tonight.", "I going to call her tonight."),
      pair("They are going to hire two people.", "They going to hire two people."),
      pair("She isn't going to join the call.", "She isn't going join the call."),
    ],
  },
  "zero-article": {
    watchFor: "No the with things in general: I like music, not the music (unless you mean a specific track).",
    examples: [
      pair("I like music.", "I like the music. (if you mean music in general)"),
      pair("Dogs need water.", "The dogs need water. (if you mean all dogs)"),
      pair("She works in finance.", "She works in the finance. (as a field)"),
    ],
  },
  "some-any": {
    watchFor: "Any in questions and negatives; some in ordinary positives.",
    examples: [
      pair("I don't have any sugar.", "I don't have some sugar."),
      pair("Do you have any questions?", "Do you have some questions? (as a normal offer, some can be OK — not in a negative)"),
      pair("I have some time this afternoon.", "I have any time this afternoon."),
    ],
  },
  "much-many-a-lot-of": {
    watchFor: "Many with emails; much with time. Do not say many time.",
    examples: [
      pair("We don't have much time.", "We don't have many time."),
      pair("She gets many emails.", "She gets much emails."),
      pair("There is a lot of work this week.", "There are a lot of work this week."),
    ],
  },
  "this-that-these-those": {
    watchFor: "This/that = one thing. These/those = more than one.",
    examples: [
      pair("These keys are mine.", "This keys are mine."),
      pair("That chair is free.", "Those chair is free."),
      pair("Could you pass me that file?", "Could you pass me those file?"),
    ],
  },
  "possessive-adjectives-pronouns": {
    watchFor: "Hers, mine, yours stand alone. Do not put a noun after them.",
    examples: [
      pair("The bag is hers.", "The bag is her."),
      pair("Is this seat mine?", "Is this seat my?"),
      pair("Her laptop is on the desk.", "Hers laptop is on the desk."),
    ],
  },
  "possessive-s": {
    watchFor: "People take 's: Tom's phone. A plural that already ends in s takes only ': the students' room.",
    examples: [
      pair("Tom's phone is on the desk.", "Toms phone is on the desk."),
      pair("The students' room is locked.", "The student's room is locked. (if you mean more than one student)"),
      pair("My manager's email is below.", "My managers email is below."),
    ],
  },
  "question-formation": {
    watchFor: "After do, does, or did, the main verb stays in the base: did they wait, not did they waited.",
    examples: [
      pair("Did they wait long?", "Did they waited long?"),
      pair("Where does she live?", "Where does she lives?"),
      pair("Do you work from home?", "Do you works from home?"),
    ],
  },
  "countable-uncountable": {
    watchFor: "Advice, information, and furniture do not take a/an.",
    examples: [
      pair("I need some advice.", "I need an advice."),
      pair("There are two chairs.", "There are two furnitures."),
      pair("Can I have a glass of water?", "Can I have a water?"),
    ],
  },
  "can-could": {
    watchFor: "After can or could, use the base verb: could you open, not opening.",
    examples: [
      pair("Could you open the window?", "Could you opening the window?"),
      pair("I can swim.", "I can to swim."),
      pair("She couldn't join the call.", "She couldn't joining the call."),
    ],
  },
  "must-have-to": {
    watchFor: "Don't have to = optional. Mustn't = not allowed. They are not the same.",
    examples: [
      pair("You don't have to come if you are busy.", "You mustn't come if you are busy. (if you only mean it is optional)"),
      pair("You have to wear a badge here.", "You have wear a badge here."),
      pair("You mustn't share that password.", "You don't have to share that password. (if you mean it is forbidden)"),
    ],
  },
  "should": {
    watchFor: "Should + base verb. No to: you should see, not should to see.",
    examples: [
      pair("You should see a doctor.", "You should to see a doctor."),
      pair("We shouldn't send that yet.", "We shouldn't to send that yet."),
      pair("Should I call her back?", "Should I calling her back?"),
    ],
  },
  "used-to": {
    watchFor: "In questions and negatives: did you use to, not did you used to.",
    examples: [
      pair("Did you use to live here?", "Did you used to live here?"),
      pair("I used to smoke.", "I use to smoke. (for a past habit)"),
      pair("She didn't use to work weekends.", "She didn't used to work weekends."),
    ],
  },
  "for-since": {
    watchFor: "For + length (for three years). Since + starting point (since 2021).",
    examples: [
      pair("I have lived here since 2021.", "I have lived here for 2021."),
      pair("She has been off for a week.", "She has been off since a week."),
      pair("We have used this tool since Monday.", "We have used this tool for Monday."),
    ],
  },
  "its-vs-its": {
    watchFor: "It's = it is / it has. Its = belonging, no apostrophe.",
    examples: [
      pair("The dog wagged its tail.", "The dog wagged it's tail."),
      pair("It's been a long week.", "Its been a long week."),
    ],
  },
  "affect-vs-effect": {
    watchFor: "If you can put the in front of it, you probably want effect (the noun).",
    examples: [
      pair("The news affected her.", "The news effected her."),
      pair("The effect was immediate.", "The affect was immediate."),
    ],
  },
  "fewer-vs-less": {
    watchFor: "Fewer emails (you can count them). Less time (you cannot).",
    examples: [
      pair("I get fewer emails now.", "I get less emails now."),
      pair("We have less time today.", "We have fewer time today."),
    ],
  },
  "make-vs-do": {
    watchFor: "Make a decision, a mistake, a cake. Do homework, the shopping, your job.",
    examples: [
      pair("I need to make a decision.", "I need to do a decision."),
      pair("I have to do the shopping.", "I have to make the shopping."),
      pair("She made a mistake in the invoice.", "She did a mistake in the invoice."),
    ],
  },
  "say-vs-tell": {
    watchFor: "Tell someone something. Say something (to someone).",
    examples: [
      pair("She told me the news.", "She said me the news."),
      pair("He said he was late.", "He told he was late."),
      pair("Can you tell her I'll call?", "Can you say her I'll call?"),
    ],
  },
  "good-vs-well": {
    watchFor: "Good describes a noun. Well describes how you do an action.",
    examples: [
      pair("She sings well.", "She sings good."),
      pair("That's a good point.", "That's a well point."),
      pair("I don't feel well.", "I don't feel good. (if you mean health)"),
    ],
  },
  "every-vs-each": {
    watchFor: "Both take a singular noun: each student, not each students.",
    examples: [
      pair("Each student has a locker.", "Each students have a locker."),
      pair("Every meeting starts at 10.", "Every meetings start at 10."),
      pair("Each of the files is labelled.", "Each of the files are labelled."),
    ],
  },
  "other-another-others": {
    watchFor: "Another + one thing. Others stands alone, with no noun after it.",
    examples: [
      pair("Would you like another cup?", "Would you like other cup?"),
      pair("Other people have already left.", "Others people have already left."),
      pair("I'll take this one. You can have the others.", "I'll take this one. You can have the other. (if more than one remain)"),
    ],
  },
  "been-vs-gone": {
    watchFor: "Has gone = still there. Has been = went and came back.",
    examples: [
      pair("She has gone to the bank. She isn't here.", "She has been to the bank. She isn't here. (if she is still at the bank)"),
      pair("I have been to Lisbon twice.", "I have gone to Lisbon twice. (for a trip you came back from)"),
    ],
  },
  "ed-vs-ing-adjectives": {
    watchFor: "People feel -ed. Things are often -ing: I am bored / the film is boring.",
    examples: [
      pair("The film is boring.", "The film is bored."),
      pair("I am interested in the role.", "I am interesting in the role."),
      pair("The news was surprising.", "The news was surprised."),
    ],
  },
  "already-yet-still": {
    watchFor: "Yet in questions and negatives. Already in positives. Still = it continues.",
    examples: [
      pair("Has the parcel arrived yet?", "Has the parcel arrived already? (if you only mean 'up to now')"),
      pair("She has already left.", "She has left yet."),
      pair("He still hasn't called.", "He yet hasn't called."),
    ],
  },
  "reflexive-pronouns": {
    watchFor: "Use myself only when subject and object are the same person.",
    examples: [
      pair("She taught herself Spanish.", "She taught herself me Spanish."),
      pair("I booked the ticket myself.", "I booked the ticket me."),
      pair("He made himself a coffee.", "He made him a coffee. (if he made it for himself)"),
    ],
  },
  "relative-pronouns": {
    watchFor: "Who for people in a relative clause. Which for things, not people.",
    examples: [
      pair("The woman who called is my manager.", "The woman which called is my manager."),
      pair("The file that I sent is in your inbox.", "The file who I sent is in your inbox."),
      pair("This is the café which opened last week.", "This is the café who opened last week."),
    ],
  },
  "prepositions-of-movement": {
    watchFor: "Into / onto for entering a space or surface. In / on is where something already is.",
    examples: [
      pair("She walked into the room.", "She walked in the room. (if you mean she entered)"),
      pair("Put the bag onto the seat.", "Put the bag into the seat. (if you mean the surface)"),
      pair("He got off the bus at my stop.", "He got out the bus at my stop."),
    ],
  },
  "dependent-prepositions": {
    watchFor: "Learn the pair: interested in, good at, listen to — not in/on/at from place.",
    examples: [
      pair("She is interested in design.", "She is interested on design."),
      pair("He is good at numbers.", "He is good in numbers."),
      pair("Please listen to this voicemail.", "Please listen this voicemail."),
    ],
  },
  "may-might": {
    watchFor: "May/might + base verb. This is possibility, not ability (that is can).",
    examples: [
      pair("It might rain later.", "It might raining later."),
      pair("She may be in a meeting.", "She may to be in a meeting."),
      pair("I might not make the 6 o'clock train.", "I might not making the 6 o'clock train."),
    ],
  },
  "too-enough": {
    watchFor: "Too comes before the adjective. Enough comes after it: too heavy / old enough.",
    examples: [
      pair("This bag is too heavy.", "This bag is enough heavy."),
      pair("She is old enough to drive.", "She is enough old to drive."),
      pair("The room isn't large enough.", "The room isn't too large enough."),
    ],
  },
  "as-as": {
    watchFor: "As + adjective + as. Do not mix in -er: not as taller as.",
    examples: [
      pair("She is as tall as her brother.", "She is as taller as her brother."),
      pair("This task is not as urgent as that one.", "This task is not as more urgent as that one."),
      pair("The new office is as noisy as the old one.", "The new office is as noisier as the old one."),
    ],
  },
  "adverbs-of-frequency": {
    watchFor: "Before the main verb, but after am/is/are: she is always late, not she always is late.",
    examples: [
      pair("She is always late.", "She always is late."),
      pair("He usually takes the early train.", "He takes usually the early train."),
      pair("I am never free on Fridays.", "I never am free on Fridays."),
    ],
  },
  "gerunds-vs-infinitives": {
    watchFor: "Enjoy/avoid/finish take -ing. Want/decide/hope take to. Do not mix the lists.",
    examples: [
      pair("I enjoy swimming.", "I enjoy to swim."),
      pair("She wants to leave early.", "She wants leaving early."),
      pair("He finished writing the email.", "He finished to write the email."),
    ],
  },
  "zero-conditional": {
    watchFor: "Both parts stay in the present. Will does not belong here.",
    examples: [
      pair("If you heat ice, it melts.", "If you heat ice, it will melts."),
      pair("If I don't eat, I get a headache.", "If I don't eat, I will getting a headache."),
      pair("If the app crashes, we restart it.", "If the app will crash, we restart it."),
    ],
  },
  "first-conditional": {
    watchFor: "No will in the if-clause: if it rains, not if it will rain.",
    examples: [
      pair("If it rains, we will stay in.", "If it will rain, we will stay in."),
      pair("If she calls, I will pick up.", "If she will call, I will pick up."),
      pair("We won't start if they are late.", "We won't start if they will be late."),
    ],
  },
  "second-conditional": {
    watchFor: "If + past, would + base. Not if I would have.",
    examples: [
      pair("If I had time, I would help.", "If I would have time, I would help."),
      pair("If I were you, I would wait.", "If I would be you, I would wait."),
      pair("She would join if the train were cheaper.", "She would join if the train would be cheaper."),
    ],
  },
  "passive-present": {
    watchFor: "Am/is/are + past participle: are made, not are make.",
    examples: [
      pair("The parts are made in Osaka.", "The parts are make in Osaka."),
      pair("This room is cleaned every night.", "This room is clean every night. (as a passive)"),
      pair("The invoices are sent on Fridays.", "The invoices are send on Fridays."),
    ],
  },
  "passive-past": {
    watchFor: "Was/were + past participle: was sent, not was send.",
    examples: [
      pair("The email was sent yesterday.", "The email was send yesterday."),
      pair("The chairs were moved after the meeting.", "The chairs were move after the meeting."),
      pair("I wasn't told about the change.", "I wasn't tell about the change."),
    ],
  },
  "future-simple": {
    watchFor: "Will + base: I will call, not I will calling. Won't = will not.",
    examples: [
      pair("I will call you tonight.", "I will calling you tonight."),
      pair("She won't wait after 6.", "She won't waiting after 6."),
      pair("Will they send the file today?", "Will they sending the file today?"),
    ],
  },
  "future-continuous": {
    watchFor: "Will be + -ing. You need be: I will be travelling, not I will travelling.",
    examples: [
      pair("At 8 I will be travelling.", "At 8 I will travelling."),
      pair("Don't call at noon — I'll be sitting in a meeting.", "Don't call at noon — I'll sitting in a meeting."),
      pair("They won't be working this weekend.", "They won't be work this weekend."),
    ],
  },
  "past-perfect": {
    watchFor: "Had + past participle for the earlier past event. Has is present perfect.",
    examples: [
      pair("The film had started when we arrived.", "The film has started when we arrived."),
      pair("I had already eaten, so I skipped lunch.", "I have already eaten, so I skipped lunch. (two past times)"),
      pair("She hadn't seen the email before the call.", "She hasn't seen the email before the call."),
    ],
  },
  "present-perfect-continuous": {
    watchFor: "Have/has been + -ing. Do not drop been: I have been waiting, not I have waiting.",
    examples: [
      pair("I have been waiting for an hour.", "I have waiting for an hour."),
      pair("She has been working here since May.", "She has been work here since May."),
      pair("Have you been using this laptop all morning?", "Have you been use this laptop all morning?"),
    ],
  },
  "reported-statements": {
    watchFor: "Tense usually moves back: “I work here” → she said she worked there.",
    examples: [
      pair("She said she worked there.", "She said she work there."),
      pair("He told me he was exhausted.", "He told me he is exhausted. (if you report it later)"),
      pair("They said they would send it on Friday.", "They said they will send it on Friday. (reported later)"),
    ],
  },
  "third-conditional": {
    watchFor: "If + had + participle, would have + participle. Not if I would have left.",
    examples: [
      pair("If I had left earlier, I would have caught the train.", "If I would have left earlier, I would have caught the train."),
      pair("If she had seen the email, she would have replied.", "If she would have seen the email, she would have replied."),
      pair("We wouldn't have been late if the bus had come.", "We wouldn't have been late if the bus would have come."),
    ],
  },
  "mixed-conditionals": {
    watchFor: "Unreal past condition, present result: if I had studied medicine, I would be a doctor now.",
    examples: [
      pair("If I had studied medicine, I would be a doctor now.", "If I had studied medicine, I would have been a doctor now. (if you mean the job now)"),
      pair("If we had left on time, we wouldn't be stuck here.", "If we had left on time, we wouldn't have been stuck here. (if you mean now)"),
    ],
  },
  "was-were": {
    watchFor: "I/he/she/it was. You/we/they were.",
    examples: [
      pair("They were at home.", "They was at home."),
      pair("I was on a call.", "I were on a call."),
      pair("Were you free at 3?", "Was you free at 3?"),
    ],
  },
  "have-has": {
    watchFor: "He, she, and it take has. Everyone else takes have.",
    examples: [
      pair("She has a car.", "She have a car."),
      pair("I have two meetings today.", "I has two meetings today."),
      pair("Does he have the keys?", "Does he has the keys?"),
    ],
  },
  "question-tags": {
    watchFor: "Positive statement → negative tag. You're late, aren't you?",
    examples: [
      pair("You're late, aren't you?", "You're late, are you? (as a normal checking tag)"),
      pair("She doesn't drive, does she?", "She doesn't drive, doesn't she?"),
      pair("They've left, haven't they?", "They've left, have they? (as a normal checking tag)"),
    ],
  },
  "indirect-questions": {
    watchFor: "After I wonder / do you know, use statement order: where she lives, not where does she live.",
    examples: [
      pair("I wonder where she lives.", "I wonder where does she live."),
      pair("Could you tell me what time it starts?", "Could you tell me what time does it start?"),
      pair("Do you know if the train is delayed?", "Do you know if is the train delayed?"),
    ],
  },
  "used-to-vs-would": {
    watchFor: "Would does not work for past states (ownership, feelings). Use used to.",
    examples: [
      pair("I used to have a motorbike.", "I would have a motorbike when I was 20. (for ownership)"),
      pair("Every Sunday we would walk by the river.", "Every Sunday we used walk by the river."),
      pair("She used to be shy.", "She would be shy. (as a past state)"),
    ],
  },
  "used-to-vs-be-used-to": {
    watchFor: "Be used to + noun/-ing = accustomed now. Used to + verb = a past habit that stopped.",
    examples: [
      pair("I am used to working nights.", "I used to working nights. (if you mean accustomed now)"),
      pair("I used to work nights. I don't any more.", "I am used to work nights. (if you mean a past habit)"),
      pair("She is used to the noise.", "She used to the noise."),
    ],
  },
  "adjective-vs-adverb": {
    watchFor: "After a verb of action, you usually need an adverb: she speaks quietly, not quiet.",
    examples: [
      pair("She speaks quietly.", "She speaks quiet."),
      pair("It was a quiet room.", "It was a quietly room."),
      pair("Please drive carefully.", "Please drive careful."),
    ],
  },
  "a-few-vs-a-little": {
    watchFor: "A few emails (countable). A little time (uncountable).",
    examples: [
      pair("I have a little time.", "I have a few time."),
      pair("I have a few emails to send.", "I have a little emails to send."),
      pair("There's a little milk left.", "There's a few milk left."),
    ],
  },
  "gerunds-after-verbs": {
    watchFor: "Mind, suggest, keep, miss, consider take -ing, not to.",
    examples: [
      pair("Would you mind waiting?", "Would you mind to wait?"),
      pair("He suggested taking a taxi.", "He suggested to take a taxi."),
      pair("We're considering changing flats.", "We're considering to change flats."),
    ],
  },
  "infinitives-after-verbs": {
    watchFor: "Want, decide, hope, plan, refuse take to + verb, not -ing.",
    examples: [
      pair("She decided to wait.", "She decided waiting."),
      pair("They hope to find a flat soon.", "They hope finding a flat soon."),
      pair("He refused to sign the form.", "He refused signing the form."),
    ],
  },
  "linking-words": {
    watchFor: "Despite takes a noun or -ing, not a full clause. For a clause, use although.",
    examples: [
      pair("I stayed in because it was raining.", "I stayed in despite it was raining."),
      pair("Although I was tired, I finished the report.", "Although I was tired, but I finished the report."),
      pair("The train was late. However, we still made the meeting.", "The train was late, however we still made the meeting. (as one comma splice)"),
    ],
  },
  "despite-in-spite-of": {
    watchFor: "Despite / in spite of + noun or -ing. Not despite it was raining.",
    examples: [
      pair("Despite the rain, we walked.", "Despite it was raining, we walked."),
      pair("In spite of feeling tired, she joined the call.", "In spite of she felt tired, she joined the call."),
      pair("We went out despite the delay.", "We went out despite of the delay."),
    ],
  },
  "so-vs-such": {
    watchFor: "So + adjective. Such + (a/an) + adjective + noun: so cold / such a cold day.",
    examples: [
      pair("It was such a cold day.", "It was so a cold day."),
      pair("The room was so quiet.", "The room was such quiet."),
      pair("It was such an easy task.", "It was so an easy task."),
    ],
  },
  "so-neither": {
    watchFor: "Agree with a negative using neither, not so: I don't. Neither do I.",
    examples: [
      pair("I don't eat meat. Neither do I.", "I don't eat meat. So do I."),
      pair("I like tea. So do I.", "I like tea. Neither do I."),
      pair("She hasn't left. Neither have I.", "She hasn't left. So have I."),
    ],
  },
  "wish-if-only": {
    watchFor: "Wish + past for now. Wish + past perfect for a past you cannot change. Not I wish I would have more time now.",
    examples: [
      pair("I wish I had more time.", "I wish I would have more time now."),
      pair("I wish I had left earlier.", "I wish I left earlier. (for a past regret)"),
      pair("If only the train were on time.", "If only the train would be on time. (for a present wish)"),
    ],
  },
  "causative": {
    watchFor: "Have/get + object + past participle: I had my car serviced (someone else did it).",
    examples: [
      pair("I had my car serviced.", "I had serviced my car. (if you mean a garage did it)"),
      pair("She got her hair cut.", "She got cut her hair."),
      pair("We need to have the lock changed.", "We need to have changed the lock."),
    ],
  },
  "subject-verb-agreement": {
    watchFor: "Everyone, each, and news are singular: the news is on.",
    examples: [
      pair("The news is on at 6.", "The news are on at 6."),
      pair("Everyone is ready.", "Everyone are ready."),
      pair("The files are on your desk.", "The files is on your desk."),
    ],
  },
  "tricky-uncountables": {
    watchFor: "Advice, information, furniture, luggage, news — no a/an and no plural -s in this use.",
    examples: [
      pair("She gave me some advice.", "She gave me an advice."),
      pair("I need more information.", "I need more informations."),
      pair("The luggage is in the hall.", "The luggages are in the hall."),
    ],
  },
  "by-vs-until": {
    watchFor: "By = deadline (not later than). Until = how long something continues.",
    examples: [
      pair("Please send it by Friday.", "Please send it until Friday. (if you mean a deadline)"),
      pair("The shop is open until 8.", "The shop is open by 8. (if you mean it continues to 8)"),
      pair("I'll be back by 6.", "I'll be back until 6. (if you mean a deadline to return)"),
    ],
  },
  "in-time-vs-on-time": {
    watchFor: "On time = at the scheduled moment. In time = early enough to do something.",
    examples: [
      pair("We arrived in time to board.", "We arrived on time to board. (if you only mean ‘with minutes to spare’)"),
      pair("The train left on time.", "The train left in time. (if you mean it left as scheduled)"),
      pair("I got there in time to print the slides.", "I got there on time to print the slides. (if you mean just enough time)"),
    ],
  },
  "at-the-end-vs-in-the-end": {
    watchFor: "At the end of + a noun. In the end = finally.",
    examples: [
      pair("In the end we took a taxi.", "At the end we took a taxi. (if you mean ‘finally’)"),
      pair("I'll meet you at the end of the street.", "I'll meet you in the end of the street."),
      pair("At the end of the film, nobody spoke.", "In the end of the film, nobody spoke."),
    ],
  },
  "during-vs-while": {
    watchFor: "During + a noun. While + a clause: during the meeting / while we were talking.",
    examples: [
      pair("Please don't call during the meeting.", "Please don't call during we were meeting."),
      pair("She took notes while he was speaking.", "She took notes during he was speaking."),
      pair("I fell asleep during the film.", "I fell asleep while the film. (if there is no verb)"),
    ],
  },
  "who-vs-whom": {
    watchFor: "Who is the subject. Whom is the object: whom did you call, not whom called you.",
    examples: [
      pair("Whom did you call?", "Whom called you?"),
      pair("Who sent the file?", "Whom sent the file?"),
      pair("To whom should I address this?", "To who should I address this? (in careful writing)"),
    ],
  },
  "like-vs-as": {
    watchFor: "Like + noun (similar to). As + role or clause: she works as a nurse.",
    examples: [
      pair("She works as a nurse.", "She works like a nurse. (if you mean her job)"),
      pair("She sings like her mother.", "She sings as her mother. (if you mean similar to)"),
      pair("As I said, the deadline is Friday.", "Like I said, the deadline is Friday. (in careful writing)"),
    ],
  },
  "bring-vs-take": {
    watchFor: "Bring = towards here / the speaker. Take = away from here.",
    examples: [
      pair("Please bring the files to my desk.", "Please take the files to my desk. (if I am at that desk now)"),
      pair("Take an umbrella with you.", "Bring an umbrella with you. (if you are leaving this place)"),
      pair("Can you bring that charger here?", "Can you take that charger here?"),
    ],
  },
  "borrow-vs-lend": {
    watchFor: "You borrow from someone. You lend to someone.",
    examples: [
      pair("Can I borrow your charger?", "Can I lend your charger?"),
      pair("Ana lent me a charger.", "Ana borrowed me a charger."),
      pair("I borrowed a book from the library.", "I lent a book from the library."),
    ],
  },
  "see-watch-look": {
    watchFor: "Look at something. Watch something that goes on (a film). See is often without trying.",
    examples: [
      pair("We watched a film last night.", "We looked a film last night."),
      pair("Look at this invoice.", "See at this invoice."),
      pair("Did you see her in the corridor?", "Did you watch her in the corridor? (if you only noticed her)"),
    ],
  },
  "hear-vs-listen": {
    watchFor: "Listen to + noun. Hear has no to: I heard a bang.",
    examples: [
      pair("Listen to this podcast.", "Hear to this podcast."),
      pair("I heard a bang in the kitchen.", "I listened a bang in the kitchen."),
      pair("Are you listening to me?", "Are you hearing to me?"),
    ],
  },
  "phrasal-verbs": {
    watchFor: "The particle changes the meaning: give up = stop trying, not give something upward.",
    examples: [
      pair("She gave up sugar last year.", "She gave up to sugar last year."),
      pair("I'll pick you up at 7.", "I'll pick you at 7."),
      pair("Please turn off the lights.", "Please turn the lights. (if you mean off)"),
    ],
  },
  "so-that-in-order-to": {
    watchFor: "In order to + base verb. So that + a clause (often can/could).",
    examples: [
      pair("She left early in order to catch the train.", "She left early in order that catch the train."),
      pair("She left early so that she could catch the train.", "She left early so that catch the train."),
      pair("I wrote it down so that I wouldn't forget.", "I wrote it down in order I wouldn't forget."),
    ],
  },
  "would-rather-had-better": {
    watchFor: "Had better + base (a warning now). Would rather + base (a preference). No to.",
    examples: [
      pair("You'd better leave now.", "You'd better to leave now."),
      pair("I'd rather walk.", "I'd rather to walk."),
      pair("We'd better send this today.", "We'd better sending this today."),
    ],
  },
  "stop-remember-gerund-infinitive": {
    watchFor: "Remember to lock = don't forget later. Remember locking = a memory of the past.",
    examples: [
      pair("Remember to lock the door.", "Remember locking the door. (if you mean ‘don't forget later’)"),
      pair("He stopped smoking last year.", "He stopped to smoking last year."),
      pair("She stopped to check the map.", "She stopped checking the map. (if she paused the walk in order to check)"),
    ],
  },
  "who-which-that": {
    watchFor: "Which, not that, after a comma for extra information. Who is for people.",
    examples: [
      pair("The files that I sent are in your inbox.", "The files who I sent are in your inbox."),
      pair("My manager, who sits next to me, is away.", "My manager, which sits next to me, is away."),
      pair("The office, which opened in May, is already full.", "The office, that opened in May, is already full."),
    ],
  },
  "first-vs-second-conditional": {
    watchFor: "Real possible future = if + present, will. Unreal now = if + past, would.",
    examples: [
      pair("If I won the lottery, I would travel.", "If I win the lottery, I would travel."),
      pair("If it rains tomorrow, we will stay in.", "If it rains tomorrow, we would stay in."),
      pair("If I were you, I would wait.", "If I am you, I will wait. (for this advice)"),
    ],
  },
  "present-perfect-vs-present-perfect-continuous": {
    watchFor: "Have written three emails = a result you can count. Have been writing = the activity over time.",
    examples: [
      pair("I have been writing all morning.", "I have written all morning. (if you mean the activity, not a finished count)"),
      pair("I have written three emails.", "I have been writing three emails. (if you mean a finished count)"),
      pair("She has been waiting since 9.", "She has waited since 9. (if you want to stress the ongoing wait)"),
    ],
  },
  "reported-questions": {
    watchFor: "Statement word order: she asked where I lived, not where did I live.",
    examples: [
      pair("She asked where I lived.", "She asked where did I live."),
      pair("He asked if I was ready.", "He asked if was I ready."),
      pair("They asked what time it started.", "They asked what time did it start."),
    ],
  },
  "lay-vs-lie": {
    watchFor: "Lay needs an object (lay the keys). Lie has no object (lie on the sofa). Past of lie is lay.",
    examples: [
      pair("Lay the keys on the desk.", "Lie the keys on the desk."),
      pair("I'm going to lie down for ten minutes.", "I'm going to lay down for ten minutes. (no object)"),
      pair("Yesterday I lay on the sofa.", "Yesterday I laid on the sofa. (if you mean recline)"),
    ],
  },
  "future-perfect": {
    watchFor: "Will have + past participle: I will have left, not I will have leave.",
    examples: [
      pair("By 6 I will have left.", "By 6 I will have leave."),
      pair("By Friday we will have sent the invoice.", "By Friday we will have send the invoice."),
      pair("Don't call at 7. I will have gone by then.", "Don't call at 7. I will have go by then."),
    ],
  },
};
