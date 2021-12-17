import React, { useState, useEffect } from "react"

export const ListingForm = ({currentUser}) => {
  const [formData, setFormData] = useState({
    listingType: "",
    title: "",
    description: "",
    topics: []
  })

  const handleOnChange = (e) => (
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  )

  const handleCheckBoxChange = (e) => {
    if (e.target.checked) {
      
      let copyOfTopics = [...formData.topics, e.target.value]
      setFormData({
        ...formData,
        topics: copyOfTopics
      })
    }
    else {
      let copyOfTopics = formData.topics.filter(t => t !== e.target.value)
      setFormData({
        ...formData,
        topics: copyOfTopics
      })
    }
  }
  
  const handleOnSubmit = (e) => {
    e.preventDefault()
    fetch("/api/v1/listings/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        listing: {
          listing_type: formData.listingType,
          title: formData.title,
          description: formData.description,
          topic_ids: formData.topics,
          user_provider_id: currentUser.id
        }
      })
    })
  }
  
  const [allTopicOptions, setAllTopicOptions] = useState([])
  useEffect(()=> {
    fetch("/api/v1/topics")
      .then(resp => resp.json())
      .then(topics => {
        setAllTopicOptions(topics.topics)
        })
  },[])
  
  const renderTopics = () => (
    allTopicOptions.map(t => (
      <div key={t.id}>
        <input  type="checkbox" name="topics" value={t.id} onChange={handleCheckBoxChange} />
        <label>{t.name}</label><br/>
      </div>
    )) 
  )


  return (
    <section>
      <h2>New Listing</h2>
      <form onSubmit={handleOnSubmit}>
        <label>Listing Type:</label>
        <select name="listingType" value={formData.listingType} onChange={handleOnChange}>
          <option value=""></option>
          <option value="Mate">Mate</option>
        </select>
       
        <label>Title:</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleOnChange}
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleOnChange}
        />
        <label>Topics:</label>
        {renderTopics()}
        <button type="submit">
          Create Listing
        </button>
      </form>
    </section>
  )  
}

