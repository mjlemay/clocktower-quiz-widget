const quiz = {
    pages: [
      {
        prompt: `You have traveled for a very long time though strange and brutal lands seeking something. 
        Trouble is, it's been so long that you can't remember what you're seeking.
        In truth you can't remember anything. 
        As you try to recall your travels an early memory is dredged up--one of pain and loss.`,
        question: `When you set out on your journey, what did you leave behind?`,
        limit: 2,
        choices: [
          {
            text:`A beautiful homeland.`,
            mods: [
              {cha:15},
              {cha:14},
            ]
          },
          {
            text:`A peaceful homeland.`,
            mods: [
              {con:15},
              {con:14},
            ]
          },
          {
            text:`A kind homeland.`,
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
            text:`The kind of people who always loved you.`,
            mods: [
              {str:12},
              {str:10},
            ]
          },
          {
            text:`The kind of people who always forgave you.`,
            mods: [
              {wis:12},
              {wis:10},
            ]
          },
          {
            text:`The kind of people who always believed you.`,
            mods: [
              {dex:12},
              {dex:10},
            ]
          }
        ]
      },
      {
        prompt: `With the past left behind. You started on the hard path that led towards your goal,
         but it was still so far away. Yet the draw of the thing your seeking lead you ever onward.
          A stalwart determination kept you on your quest.`,
        question: `What are you seeking?`,
        limit: 2,
        choices: [
          {
            text:`Something Evil.`,
            mods: [
              {east:`+`, deception:`+`},
              {east:`+`, deception:`+`},
            ]
          },
          {
            text:`Something without a heart.`,
            mods: [
              {west:`+`, persuasion:`+`},
              {west:`+`, persuasion:`+`},
            ]
          },
          {
            text:`Something without a soul.`,
            mods: [
              {south:`+`, performance:`+`},
              {south:`+`, performance:`+`},
            ]
          },
          {
            text:`Something dangerous.`,
            mods: [
              {north:`+`, intimidation:`+`},
              {north:`+`, intimidation:`+`},
            ]
          }
        ]
      },
      {
        prompt: `Even though you've been through so much strife along the way, And you're so tired.
         You have become stronger with every step of your journey--surviving things no traveler should survive.`,
        question: `What has become strongest?`,
        limit: 1,
        choices: [
          {
            text:`My eyes.`,
            mods: [
              {south:`+`, insight:`+`},
            ]
          },
          {
            text:`My body.`,
            mods: [
              {north:`+`, survival:`+`},
            ]
          },
          {
            text:`My endurance.`,
            mods: [
              {east:`+`, medicine:`+`},
            ]
          },
          {
            text:`My reflexes.`,
            mods: [
              {west:`+`, perception:`+`},
            ]
          }
        ]
      },
      {
        prompt: `No matter how strong you've gotten, your memory has faded. Even these memories you can't be sure if they're correct.
         Now as you carry onward you don’t even know what your seeking. But it draws you forward. Ever forward.
          Your close now. Closer than you’ve ever been. But your too tired to carry on right now--you need to rest.
           Up ahead you find a field to rest in`,
        question: `As you set your things down, and lay down yourself you take in the size of this field--how big is the field?`,
        limit: 1,
        choices: [
          {
            text:`A small field.`,
            mods: [
              {bodyWeight:`thin`},
            ]
          },
          {
            text:`A field No bigger or smaller than most.`,
            mods: [
              {bodyWeight:`regular sized`},
            ]
          },
          {
            text:`A large field, but not overwhelming.`,
            mods: [
              {bodyWeight:`heavyset`},
            ]
          }
        ]
      },
      {
        prompt: `Leaning your body to one side you see the flora of the field softly waving through your fingertips.`,
        question: `What grows in this field?`,
        limit: 1,
        choices: [
          {
            text:`Wild oats.`,
            mods: [
              {hairColor:`blonde`},
            ]
          },
          {
            text:`Wheat.`,
            mods: [
              {hairColor:`brown`},
            ]
          },
          {
            text:`Barley.`,
            mods: [
              {hairColor:`red`},
            ]
          },
          {
            text:`Dead grass.`,
            mods: [
              {hairColor:`black`},
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
              {eyes:`green`},
            ]
          },
          {
            text:`Small flowers white petals with a small blue tint towards the middle.`,
            mods: [
              {eyes:`blue`},
            ]
          },
          {
            text:`Small yellow flowers bright.`,
            mods: [
              {eyes:`amber`},
            ]
          },
          {
            text:`The flowers are dying they're color faded.`,
            mods: [
              {eyes:`brown`},
            ]
          },
          {
            text:`They are too old. They've wilted and turned dry.`,
            mods: [
              {eyes:`gray`},
            ]
          }
        ]
      },
      {
        prompt: `Maybe it's fate, but it appears to be your favorite season too.`,
        question: `What season is it?`,
        limit: 1,
        choices: [
          {
            text:`Spring.`,
            mods: [
              {skin:`pale`},
            ]
          },
          {
            text:`Summer.`,
            mods: [
              {skin:`fair`},
            ]
          },
          {
            text:`Fall.`,
            mods: [
              {skin:`tan`},
            ]
          },
          {
            text:`Winter.`,
            mods: [
              {skin:`brown`},
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
            text:`Not sure, dawn or dusk maybe? Hard to tell if the sun is rising or falling.`,
            mods: [
              {},
            ]
          },
          {
            text:`It's day, The sun shines bright and warm on my face.`,
            mods: [
              {shade:`light`},
            ]
          },
          {
            text:`It's late at night the moon hangs, big and beautiful in the sky.`,
            mods: [
              {shade:`dark`},
            ]
          }
        ]
      },
      {
        prompt: `In this place you close your eyes, drifting blissfully off to sleep.
         You're dreams are strange and twisted that night. You dream of a Large clock tower with a blank face.
          Its hands move in opposite directions and Tick at different speeds.
           Whatever it is that you seek you know that the answers will be found there.
        You're awoken by the wind. `,
        question: `What kind of wind?`,
        limit: 1,
        choices: [
          {
            text:`A soft breeze that tickles your face and gently brings you back to the waking world.`,
            mods: [
              {gender:`female`},
            ]
          },
          {
            text:`A harsh breeze that chills you and startles you awake.`,
            mods: [
              {gender:`male`},
            ]
          },
          {
            text:`You're awoken by the wind because you realize there isn't any. Your mind sensing the oddiety stirs you awake.`,
            mods: [
              {gender:`non-binary`},
            ]
          }
        ]
      },
      {
        prompt: `Now awakened you see your things beside you where you left them. Undisturbed you look around, things seem the same.`,
        question: `What do you do?`,
        limit: 1,
        choices: [
          {
            text:`Get up and carry on--you've wasted to much time already.`,
            mods: [
              {bodyHeight:`four and a half feet`},
            ]
          },
          {
            text:`Stay and rest a while longer, things will be bad ahead. Better to rest now while you still can.`,
            mods: [
              {bodyHeight:`five and a half feet`},
            ]
          },
          {
            text:`Not hurried you take your time to get your things together but set out all the same.`,
            mods: [
              {bodyHeight:`six and a half feet`},
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
              {grooming:`clean`},
            ]
          },
          {
            text:`A tangled forest.`,
            mods: [
              {grooming:`unkept`},
            ]
          },
          {
            text:`A snarly of undergrowth vines and creatures.`,
            mods: [
              {grooming:`disheveled`},
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
            text:`A few hours if it had been a day, nothing compared to what I’ve been through before.`,
            mods: [
              {hairLength:`shaved`},
            ]
          },
          {
            text:`A day at most, I don’t usually lose track of time.`,
            mods: [
              {hairLength:`short`},
            ]
          },
          {
            text:`Maybe a couple of days? It doesn't matter, I'll carry on no matter the time.`,
            mods: [
              {hairLength:`medium`},
            ]
          },
          {
            text:`I’ve lost track at this point, it's so long all the days just blend together. `,
            mods: [
              {hairLength:`long`},
            ]
          }
        ]
      },
      {
        prompt: `You make your way onward as your mind considers the time. Then it's finally before you,
         this clock tower--and within are all the answers you've been seeking.
        The sun silhouettes it even now obscuring it from your vision.`,
        question: `What do you do?`,
        limit: 1,
        choices: [
          {
            text:`Cover my eyes with my hand and get a good look at the tower before continuing onward. `,
            mods: [
              {accessory:`hat`},
            ]
          },
          {
            text:`A day at most, I don't usually lose track of time.`,
            mods: [
              {accessory:`spectacles`},
            ]
          },
          {
            text:`Maybe a couple of days? It doesn't matter, I'll carry on no matter the time.`,
            mods: [
              {accessory:`jewelry`},
            ]
          }
        ]
      },
      {
        prompt: `As you enter into the clock tower you see a spiraling staircase stretching towards the top. 
        You struggle to think of how tall the tower might truly be. 
        `,
        question: `How tall is it?`,
        limit: 1,
        choices: [
          {
            text:`The first floor doesn't look too far away.`,
            mods: [
              {outerCovering:`lack of coat`},
            ]
          },
          {
            text:`It might be a bit of a climb but I’ll make it.`,
            mods: [
              {outerCovering:`waist-length coat`},
            ]
          },
          {
            text:`It's a very long way. I didn't think it would be easy though.`,
            mods: [
              {outerCovering:`knee-length overcoat`},
            ]
          },
          {
            text:`It seems impossibly tall... Might as well start now.`,
            mods: [
              {outerCovering:`an ankle-length overcoat`},
            ]
          }
        ]
      },
      {
        prompt: `You have now reached the second floor of the tower. 
        `,
        question: `What do you do when you finally reach this floor?`,
        limit: 1,
        choices: [
          {
            text:`I straighten myself up and proceed through the door.`,
            mods: [
              {trinket:`musical instrument`},
            ]
          },
          {
            text:`I check all of my equipment and continue.`,
            mods: [
              {trinket:`game set`},
            ]
          },
          {
            text:`I catch my breath for a while, then carry on.`,
            mods: [
              {trinket:`small idol`},
            ]
          }
        ]
      },
      {
        prompt: `You find yourself on the next floor of the clock tower, It’s door opens up to a large and well stocked study in the room centermost there is a table.
        On the table are four books laid out as if someone had selected them. You grab one cautiously.`,
        question: `What do you do when you finally reach this floor?`,
        limit: 1,
        choices: [
          {
            text:`The Divine Comedy by Dante Alighieri`,
            mods: [
                {west:`+`, tiebreakClass: `west`},
            ]
          },
          {
            text:`The Lurking Fear by H.P. Lovecraft`,
            mods: [
                {south:`+`, tiebreakClass: `south`},
            ]
          },
          {
            text:`The Picture of Dorian Grey by Oscar Wilde`,
            mods: [
                {north:`+`, tiebreakClass: `north`},
            ]
          },
          {
            text:`Alice in Wonderland by Lewis Carroll`,
            mods: [
                {east:`+`, tiebreakClass: `east`},
            ]
          }
        ]
      },
      {
        prompt: `As you pick it up you see it's well read.`,
        question: `What do you do?`,
        limit: 1,
        choices: [
          {
            text:`I look through it and see if anything is important in it. It must be here for a reason.`,
            mods: [
                {weaponSetA:`+`},
            ]
          },
          {
            text:`I sit down and take a good look through the book. The clock tower isn't going anywhere. `,
            mods: [
                {weaponSetB:`+`},
            ]
          }
        ]
      },
      {
        prompt: `...`,
        question: `What do you do with the book when you're finished with it?`,
        limit: 1,
        choices: [
          {
            text:`I set it back on the table. It's doesn't belong to me.`,
            mods: [
                {weaponSetA:`+`},
            ]
          },
          {
            text:`I take it with me. It might be useful later.`,
            mods: [
                {weaponSetB:`+`},
            ]
          }
        ]
      },
      {
        prompt: `As you turn around you realize that the study is on fire. The door to the next floor is currently engulfed in flames.`,
        question: `What do you do?`,
        limit: 1,
        choices: [
          {
            text:`I put my head down and slam through the door, I can take it.`,
            mods: [
                {weaponSetA:`+`},
            ]
          },
          {
            text:`I grab a nearby rug and smother the fire. I carefully exit the room.`,
            mods: [
                {weaponSetB:`+`},
            ]
          }
        ]
      },
      {
        prompt: `As you climb the stairs to the next floor you see that they are broken baring your path.`,
        question: `How do you get across the gap?`,
        limit: 1,
        choices: [
          {
            text:`I get a run, and jump the distance.`,
            mods: [
                {acrobatics:`+`},
            ]
          },
          {
            text:`I carefully climb the railing still affixed to the wall. `,
            mods: [
                {stealth:`+`},
            ]
          },
          {
            text:`Grabbing a nearby rope I climb up a level and carry on.`,
            mods: [
                {athletics:`+`},
            ]
          }
        ]
      },
      {
        prompt: `As you finally reach the door to the next floor of the clock tower you see that it’s Locked. `,
        question: `How do you go about opening it?`,
        limit: 1,
        choices: [
          {
            text:`I search around the stairwell until I find the key.`,
            mods: [
                {metal:`gold`},
            ]
          },
          {
            text:`I kick it in.`,
            mods: [
                {metal:`silver`},
            ]
          }
        ]
      },
    ]
  }

  export default quiz;