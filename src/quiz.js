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
        prompt: `Even though you've been through so much strife along the way, And you're so tired. You have become stronger with every step of your journey--surviving things no traveler should survive.`,
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
        prompt: `No matter how strong you’ve gotten, your memory has faded. Even these memories you can't be sure if they're correct. Now as you carry onward you don’t even know what your seeking. But it draws you forward. Ever forward. Your close now. Closer than you’ve ever been. But your too tired to carry on rightnow--you need to rest. Up ahead you find a field to rest in`,
        question: `As you set your things down, and lay down yourself you take in the size of this field--how big is the field?`,
        limit: 1,
        choices: [
          {
            text:'A small field.',
            mods: [
              {bodyWeight:'thin'},
            ]
          },
          {
            text:'A field No bigger or smaller than most.',
            mods: [
              {bodyWeight:'regular sized'},
            ]
          },
          {
            text:'A large field, but not overwhelming.',
            mods: [
              {west:'heavyset'},
            ]
          }
        ]
      },
      {
        prompt: `Leaning your bodyWeight to one side you see the flora of the field softly waving through your fingertips.`,
        question: `What grows in this field?`,
        limit: 1,
        choices: [
          {
            text:'Wild oats.',
            mods: [
              {hairColor:'blone'},
            ]
          },
          {
            text:'Wheat.',
            mods: [
              {hairColor:'brown'},
            ]
          },
          {
            text:'Barley.',
            mods: [
              {hairColor:'red'},
            ]
          },
          {
            text:'Dead grass.',
            mods: [
              {hairColor:'black'},
            ]
          }
        ]
      },
      {
        prompt: `As you layback you realize that it may not be the only thing growing here. Small wildflowers peak up.`,
        question: `What do they look like?`,
        limit: 1,
        choices: [
          {
            text:`They are too small, they haven't bloomed yet.`,
            mods: [
              {eyes:'green'},
            ]
          },
          {
            text:'Small flowers white petals with a small blue tint towards the middle.',
            mods: [
              {eyes:'blue'},
            ]
          },
          {
            text:'Small yellow flowers bright.',
            mods: [
              {eyes:'amber'},
            ]
          },
          {
            text:`The flowers are dying they're color faded.`,
            mods: [
              {eyes:'brown'},
            ]
          },
          {
            text:`They are too old. They've wilted and turned dry.`,
            mods: [
              {eyes:'gray'},
            ]
          }
        ]
      },
      {
        prompt: `Maybe it's Fate, but it appears to be your favorite season too.`,
        question: `What season is it?`,
        limit: 1,
        choices: [
          {
            text:'Spring.',
            mods: [
              {skin:'pale'},
            ]
          },
          {
            text:'Summer.',
            mods: [
              {skin:'fair'},
            ]
          },
          {
            text:'Fall.',
            mods: [
              {skin:'tan'},
            ]
          },
          {
            text:'Winter.',
            mods: [
              {skin:'brown'},
            ]
          }
        ]
      },
      {
        prompt: `Rolling your head back towards the sky you breath a relaxed Sigh.`,
        question: `What time of day is it?`,
        limit: 1,
        choices: [
          {
            text:'Not sure, Dawn or dusk maybe? Hard to tell if the sun is rising or falling.',
            mods: [
              {},
            ]
          },
          {
            text:`It's day, The sun shines bright and warm on my face.`,
            mods: [
              {shade:'light'},
            ]
          },
          {
            text:`It's late at night the moon hangs, big and beautiful in the sky.`,
            mods: [
              {shade:'dark'},
            ]
          }
        ]
      },
      {
        prompt: `In this place you close your eyes, drifting blissfully off to sleep. You're dreams are strange and twisted that night. You dream of a Large clock tower with a blank face. Its hands move in opposite directions and Tick at different speeds. Whatever it is that you seek you know that the answers will be found there.
        Your awoken by the wind. `,
        question: `What kind of wind?`,
        limit: 1,
        choices: [
          {
            text:`A soft breeze that tickles your face and gently brings you back to the waking world.`,
            mods: [
              {gender: 'male'},
            ]
          },
          {
            text:`A harsh breeze that chills you and startles you awake.`,
            mods: [
              {gender:'female'},
            ]
          },
          {
            text:`Your awoken by the wind because you realize there isn't any. Your mind sensing the oddiety stirs you awake.`,
            mods: [
              {gender:'non-binary'},
            ]
          }
        ]
      },
      {
        prompt: `Now awakened you see your things beside you where you left them. Undisturbed you look around, Things seem the same.`,
        question: `What do you do?`,
        limit: 1,
        choices: [
          {
            text:`Get up and carry on--you've wasted to much time already.`,
            mods: [
              {bodyHeight: 'four and a half feet'},
            ]
          },
          {
            text:`Stay and rest a while longer, things will be bad ahead. Better to rest now while you still can.`,
            mods: [
              {bodyHeight:'five and a half feet'},
            ]
          },
          {
            text:`Not hurried you take your time to get your things together but set out all the same.`,
            mods: [
              {bodyHeight:'six and a half feet'},
            ]
          }
        ]
      },
      {
        prompt: `You leave the field. Heading onward. In the distance you see the silhouette of a large clock tower. 
        The road to this mysterious clock tower was much longer than you expected. Making your way through the forest`,
        question: `What is the trip like?`,
        limit: 1,
        choices: [
          {
            text:`A neat but ominous path.`,
            mods: [
              {grooming: 'clean'},
            ]
          },
          {
            text:`A tangled forest.`,
            mods: [
              {grooming:'unkept'},
            ]
          },
          {
            text:`A snarly of undergrowth vines and creatures.`,
            mods: [
              {grooming:'disheveled'},
            ]
          }
        ]
      },
      {
        prompt: `You glance at the sky and you realize that it may not even be the same day.`,
        question: `Just how long has it been?`,
        limit: 1,
        choices: [
          {
            text:`A few hours if it had been a day, Nothing compared to what I’ve been through before.`,
            mods: [
              {hairLength: 'shaved'},
            ]
          },
          {
            text:`A day at most, I don’t usually lose track of time.`,
            mods: [
              {hairLength:'short'},
            ]
          },
          {
            text:`Maybe a couple of days? It doesn't matter, I'll carry on no matter the time.`,
            mods: [
              {hairLength:'medium'},
            ]
          },
          {
            text:`I’ve lost track at this point, it's so long all the days just blend together. `,
            mods: [
              {hairLength:'long'},
            ]
          }
        ]
      },
      {
        prompt: `You make your way onward as your mind considers the time. Then it's finally before you, this clock tower--and within are all the answers you've been seeking.
        The sun silhouettes it even now obscuring it from your vision.`,
        question: `What do you do?`,
        limit: 1,
        choices: [
          {
            text:`Cover my eyes with my hand and get a good look at the tower before continuing onward. `,
            mods: [
              {accessory: 'hat'},
            ]
          },
          {
            text:`A day at most, I don't usually lose track of time.`,
            mods: [
              {accessory:'spectacles'},
            ]
          },
          {
            text:`Maybe a couple of days? It doesn't matter, I'll carry on no matter the time.`,
            mods: [
              {accessory:'jewelry'},
            ]
          }
        ]
      },
      {
        prompt: `As you enter into the clock tower you see a spiraling staircase stretching towards the top. 
        You struggle to think of how tall the tower might truly be. 
        `,
        question: `How Tall is it?`,
        limit: 1,
        choices: [
          {
            text:`The first floor doesn't look too far away.`,
            mods: [
              {outerCovering: 'lack of coat'},
            ]
          },
          {
            text:`It might be a bit of a climb but I’ll make it.`,
            mods: [
              {outerCovering:'waist-length coat'},
            ]
          },
          {
            text:`It's a very long way. I didn't think it would be easy though.`,
            mods: [
              {outerCovering:'knee-length overcoat'},
            ]
          },
          {
            text:`It seems impossibly tall... Might as well start now.`,
            mods: [
              {outerCovering:'an ankle-length overcoat'},
            ]
          }
        ]
      },
    ]
  }

  export default quiz;