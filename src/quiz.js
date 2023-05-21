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
              {east:'+', deception: 1},
              {east:'+', deception: 1},
            ]
          },
          {
            text:'Something without a heart.',
            mods: [
              {east:'+', west: '+', persuasion: 1},
              {east:'+', west: '+', persuasion: 1},
            ]
          },
          {
            text:'Something without a soul.',
            mods: [
              {east:'+', south: '+', performance: 1},
              {east:'+', south: '+', performance: 1},
            ]
          },
          {
            text:'Something dangerous.',
            mods: [
              {north:'+', intimidation: 1},
              {north:'+', intimidation: 1},
            ]
          }
        ]
      },
    ]
  }

  export default quiz;