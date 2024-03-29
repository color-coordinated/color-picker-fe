import React from 'react'
import { shallow } from 'enzyme'
import { SaveProjectForm, mapState, mapDispatch } from './SaveProjectForm'
import { addNewProject } from '../../actions'
import { postProject } from '../../apiCalls'


jest.mock('../../apiCalls')

describe('SaveProjectForm', () => {
  describe('SaveProjectForm component', () => {
    let wrapper;

    beforeEach(() => {

     const mockPostProject = postProject.mockImplementation(() => {
        return Promise.resolve({id: 3})
      })
      const mockProjects = [
        {
          id: 1,
          name: 'a project'
        },
        {
          id: 2,
          name: 'another project'
        }
      ]

      const mockAddNewProject = jest.fn()
      
      wrapper = shallow(<SaveProjectForm projects={mockProjects} postProject={mockPostProject} addNewProject={mockAddNewProject} />)
    })

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should update name in state when handleChange is called', () => {
      const mockEvent = { preventDefault() {}, target: {name: 'name', value: 'exciting title'}}

      const expected = 'exciting title'

      wrapper.instance().handleChange(mockEvent)

      expect(wrapper.state('name')).toEqual(expected)
    })

    it('should reset state to an empty string on clearInput', () => {
      const defaultState = {name: 'rainbows'}
      const resetState = {name: ''}

      wrapper.instance().setState(defaultState)
      wrapper.instance().clearInput()

      expect(wrapper.state()).toEqual(resetState)
    })

    it('should call addNewProject when handleSubmit is called', async () => {
      const mockEvent = { preventDefault: jest.fn() }
    
      const mockState = { name: 'rainbows and unicorns'}

      wrapper.instance().clearInput = jest.fn()

      wrapper.instance().setState(mockState)

      wrapper.instance().forceUpdate()
     
      await wrapper.instance().handleSubmit(mockEvent)
      
      expect(postProject).toHaveBeenCalled()
      expect(postProject).toHaveBeenCalledWith('rainbows and unicorns')
      //why did i have to use wrapper.instance.props here?
      expect(wrapper.instance().props.addNewProject).toHaveBeenCalled()

      expect(wrapper.instance().props.addNewProject).toHaveBeenCalledWith({name: 'rainbows and unicorns', id: 3})
      expect(wrapper.instance().clearInput).toHaveBeenCalled()

      // expect(wrapper.instance().addNewProject).toHaveBeenCalled()
    })
  })

  describe('mapState', () => {
    it('should return an object with the projects array', () => {
      const mockState = {
        projects: [
          {
            id: 1,
            name: 'a project'
          }, 
          {
            id: 2,
            name: 'another project'
          }
        ],
        palettes: [
          {
            id: 1,
            project_id: 1,
            name: 'a palette',
            color_1: '#FFFFFF',
            color_2: '#FFFFFF',
            color_3: '#FFFFFF',
            color_4: '#FFFFFF',
            color_5: '#FFFFFF',
          }
        ]
      }

      const expectedState = {
        projects: [
          {
            id: 1,
            name: 'a project'
          }, 
          {
            id: 2,
            name: 'another project'
          }
        ]
      }

      const mappedProps = mapState(mockState)

      expect(mappedProps).toEqual(expectedState)
    })
  })

  describe('mapDispatch', () => {
    const mockDispatch = jest.fn()

    const actionToDispatch = addNewProject({name: 'a beautiful little butterfly', id: 4})

    const mappedProps = mapDispatch(mockDispatch)

    mappedProps.addNewProject({name:'a beautiful little butterfly', id: 4})

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
  })
})


// it('call handleDeleteProject with the correct information', () => {
//   const mockEvent = { preventDefault: jest.fn() }
  
//   wrapper.instance().updateProjects = jest.fn()
//   wrapper.instance().updatePalettes = jest.fn()

//   wrapper.instance().handleDeleteProject(mockEvent)

//   expect(deleteProject).toHaveBeenCalledWith(1);

//   expect(wrapper.instance().updateProjects).toHaveBeenCalledWith(1, [{"id": 1, "name": "a project"}, {"id": 2, "name": "another project"}])

//   expect(wrapper.instance().updatePalettes).toHaveBeenCalledWith(1, [
//     {
//       id: 1,
//       project_id: 1,
//       name: 'a palette',
//       color_1: '#123456',
//       color_2: '#123456',
//       color_3: '#123456',
//       color_4: '#123456',
//       color_5: '#123456',
//     }, 
//     {
//       id: 2,
//       project_id: 1,
//       name: 'another palette',
//       color_1: '#AABBCC',
//       color_2: '#AABBCC',
//       color_3: '#AABBCC',
//       color_4: '#AABBCC',
//       color_5: '#AABBCC',
//     }
//   ])
  


// })



// it('should call the submitForm method when the button is clicked', () => {
//   wrapper.instance().submitForm = jest.fn()
//   wrapper.instance().forceUpdate()

//   .simulate('click')

//   expect(wrapper.instance().submitForm).toHaveBeenCalled()
// })

// it.skip('should call the submitForm method with the properties in state when the button is clicked', () => {
//   const mockTitle = 'a title'
//   const mockPlot = 'a plot'

//   wrapper.instance().submitForm = jest.fn()

//   wrapper.instance().setState({
//     title: mockTitle,
//     plot: mockPlot
//   })

//   wrapper.find('button').simulate('click')

//   expect(wrapper.instance().submitForm).toHaveBeenCalledWith(mockTitle, mockPlot)
// })
// })