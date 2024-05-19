async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let result = []
  let name = ''

  const matchMentors = (learners, mentors) => {

    for (let i = 0; i < learners.data.length; i++) {

      let item = learners.data[i]
      console.log("learner: ", item)

      console.log("mentors length: ", item.mentors.length)
      for (let j = 0; j < item.mentors.length; j++) {
        let mentorId = item.mentors[j]
        console.log("mentor ID: ", mentorId)

        console.log("mentors: ", mentors.data)
        let filtered = mentors.data.filter(mentor => mentor.id === mentorId)
        console.log("filtered: ", filtered)

        name = `${filtered[0].firstName} ${filtered[0].lastName}`
        console.log("mentor name: ", name)

        item.mentors[j] = name
        console.log("edited mentor name: ", mentorId)
      }

      console.log('edited item: ', item.mentors)

      result.push(item)

    }


    console.log("learners altered: ", result)
    return result

  }

  let learnersEndpoints = axios.get('http://localhost:3003/api/learners')
  let mentorsEndpoints = axios.get('http://localhost:3003/api/mentors')

  let results = await axios.all([learnersEndpoints, mentorsEndpoints])
    .then((res) => {

      console.log("result: ", res)

      document.querySelector(".info").textContent = 'No learner is selected'

      return res

    })

  console.log("results: ", results)

  let combined = matchMentors(results[0], results[1])

  combined.forEach(element => {

    const cards = document.querySelector('.cards')
    const card = document.createElement('div')
    card.classList.add('card')

    const name = document.createElement('h3')
    name.textContent = element.fullName

    const email = document.createElement('div')
    email.textContent = element.email

    const mentor = document.createElement('h4')
    mentor.classList.add('closed')
    mentor.textContent = "Mentors"

    const list = document.createElement('ul')

    console.log("learner mentors: ", element.mentors)

    for (let i = 0; i < element.mentors.length; i++) {

      const listItem = document.createElement('li')

      let mentor = element.mentors[i]
      console.log("mentor: ", mentor)
      listItem.textContent = `${mentor}`

      list.appendChild(listItem)
    }

    card.append(name, email, mentor, list)

    cards.appendChild(card)

    card.addEventListener("click", evt => {

      let selected = document.querySelector('.selected')

      if (evt.target === card.children[2]) {

        let mentors = card.children[2]

        if (mentors.classList.contains('closed')) {

          if (!mentors.parentElement.classList.contains('selected')) {

            console.log("mentors dropdown clicked!")
            if(selected){
              console.log("selected exists!")
              selected.classList.remove('selected')
              selected.children[0].textContent = element.fullName
            }
            mentors.parentElement.classList.add('selected')
            mentors.parentElement.children[0].textContent = `${element.fullName}, ID${element.id}`
            mentors.classList.remove('closed')
            mentors.classList.add('open')
            document.querySelector(".info").textContent = `The selected learner is ${element.fullName}`
            console.log("mentors: ", mentors)

          } else {

            mentors.classList.remove('closed')
            mentors.classList.add('open')

          }

        } else {
          if(selected){
            console.log("selected exists!")
            selected.classList.remove('selected')
            selected.children[0].textContent = element.fullName
          }
          mentors.parentElement.classList.add('selected')
          mentors.parentElement.children[0].textContent = `${element.fullName}, ID${element.id}`
          mentors.classList.remove('open')
          mentors.classList.add('closed')
          document.querySelector(".info").textContent = `The selected learner is ${element.fullName}`
        }

      } else {

        if (!document.querySelector('.selected')) {

          card.classList.add('selected')
          card.children[0].textContent = `${element.fullName}, ID${element.id}`
          document.querySelector(".info").textContent = `The selected learner is ${element.fullName}`

        } else {

          if (card.classList.contains('selected')) {

            card.children[0].textContent = element.fullName
            selected.classList.remove('selected')
            document.querySelector(".info").textContent = `No learner is selected`

          } else {

            selected.children[0].textContent = element.fullName
            selected.classList.remove('selected')
            card.classList.add('selected')
            document.querySelector(".info").textContent = `The selected learner is ${element.fullName}`
            card.children[0].textContent = `${element.fullName}, ID${element.id}`

          }

        }

      }

    })


  });

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
