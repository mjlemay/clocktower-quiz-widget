const quiz = {
    pages: [
      {
        prompt: `You have traveled for a very long time though Strange and brutal lands seeking something. 
        Trouble is, it's been so long that you can't remember what you're seeking.
        In truth you can't remember anything. 
        As you try to recall your travels an early memory is dredged up--one of pain and loss.`,
        question: `When you set out on your journey, what did you leave behind?`,
        limit: 2,
        choices: [
          {
            text:'A beautiful homeland.',
            mods: [
              {cha:15},
              {cha:14},
            ]
          },
          {
            text:'A peaceful homeland.',
            mods: [
              {con:15},
              {con:14},
            ]
          },
          {
            text:'A kind homeland.',
            mods: [
              {int:15},
              {int:14},
            ]
          }
        ]
      },
      {
        prompt: `But it wasn't just a place, a home--there were people too. There always are.`,
        question: `What kind of people did you leave behind?`,
        limit: 2,
        choices: [
          {
            text:'The kind of people who always loved you.',
            mods: [
              {str:12},
              {str:10},
            ]
          },
          {
            text:'The kind of people who always forgave you.',
            mods: [
              {wis:12},
              {wis:10},
            ]
          },
          {
            text:'The kind of people who always believed you.',
            mods: [
              {dex:12},
              {dex:10},
            ]
          }
        ]
      },
      {
        prompt: `With the past left behind. You started on the hard path that led towards your goal, but it was still so far away. Yet the draw of the thing your seeking lead you ever onward. A stalwart determination kept you on your quest.`,
        question: `What are you seeking?`,
        limit: 2,
        choices: [
          {
            text:'Something Evil.',
            mods: [
              {east:'+', deception: '+'},
              {east:'+', deception: '+'},
            ]
          },
          {
            text:'Something without a heart.',
            mods: [
              {east:'+', west: '+', persuasion: '+'},
              {east:'+', west: '+', persuasion: '+'},
            ]
          },
          {
            text:'Something without a soul.',
            mods: [
              {east:'+', south: '+', performance: '+'},
              {east:'+', south: '+', performance: '+'},
            ]
          },
          {
            text:'Something dangerous.',
            mods: [
              {north:'+', intimidation: '+'},
              {north:'+', intimidation: '+'},
            ]
          }
        ]
      },
      {
        prompt: `Even though you’ve been through so much strife along the way, And you're so tired. You have become stronger with every step of your journey--surviving things no traveler should survive.`,
        question: `What has become strongest?`,
        limit: 1,
        choices: [
          {
            text:'My eyes.',
            mods: [
              {south:'+', insight: '+'},
            ]
          },
          {
            text:'My body.',
            mods: [
              {north:'+', west: '+', survival: '+'},
            ]
          },
          {
            text:'My endurance.',
            mods: [
              {east:'+', south: '+', medicine: '+'},
            ]
          },
          {
            text:'My reflexes.',
            mods: [
              {west:'+', perception: '+'},
            ]
          }
        ]
      },
      {
        prompt: `But throughout everything it’s not just your body that has grown. Your mind--maybe even your soul--has come so far in your journey with you.`,
        question: `Which of your abilities has grown the most?`,
        limit: 1,
        choices: [
          {
            text:'My ability to make choices.',
            mods: [
              {east:'+', arcana: '+'},
            ]
          },
          {
            text:'My ability to understand.',
            mods: [
              {north:'+',  religion: '+'},
            ]
          },
          {
            text:'My ability to trust your gut.',
            mods: [
              {west:'+', history: '+'},
            ]
          },
          {
            text:'My ability to see things as they really are.',
            mods: [
              {south:'+', investigation: '+'},
            ]
          }
        ]
      },
    ]
  }

  export default quiz;