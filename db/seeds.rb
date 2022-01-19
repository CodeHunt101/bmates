# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

mate_topics = [
  'Aliens',
  'Cooking',
  'Beach',
  'Biking',
  'Books',
  'Business',
  'Cars',
  'Coffee',
  'Comedy',
  'Crafts',
  'Divorce',
  'Goals',
  'Food',
  'Financial',
  'Habits',
  'Health',
  'Leadership',
  'Languages',
  'Work',
  'Hobbies',
  'Studies',
  'Mindfulness',
  'Music',
  'Movies',
  'Other',
  'Outdoor Events',
  'Pets',
  'Phone Friend',
  'Photography',
  'Reading',
  'Psychology',
  'Art',
  'Podcasts',
  'Playing Sports',
  'Relationship',
  'Religious',
  'Travel',
  'Television Shows',
  'Stress',
  'Sports',
  'Web Design',
  'Writing',
  'Clubbing',
  'Clothes',
  'Children',
  'Current Situation'
]

countries_arr = [
  "Afghanistan",
  "Aland Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua And Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegowina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo, the Democratic Republic of the",
  "Cook Islands",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard and McDonald Islands",
  "Holy See (Vatican City State)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran, Islamic Republic of",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, Democratic People's Republic of",
  "Korea, Republic of",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libyan Arab Jamahiriya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Macedonia, The Former Yugoslav Republic Of",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia, Federated States of",
  "Moldova, Republic of",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestinian Territory, Occupied",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Barthelemy",
  "Saint Helena",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan, Province of China",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "United States Minor Outlying Islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Viet Nam",
  "Virgin Islands, British",
  "Virgin Islands, U.S.",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe"
]

# coach_topics = [
#   'Business',
#   'Current Situation',
#   'Divorce',
#   'Education',
#   'Financial',
#   'Food',
#   'Goals',
#   'Habits',
#   'Studies',
#   'Tutoring'
#   'Leadership',
#   'Work',
#   'Health',
#   'Mindfulness',
#   'Other',
#   'Online dating',
#   'Relationship',
#   'Stress',
# ]

# Generate countries
countries_arr.map {|c| Country.create(name: c)}

countries = Country.all

# Generate topics
mate_topics.map {|t| Topic.create(name: t, listing_type: "Mate")}
# coach_topics.map {|t| Topic.create(name: t, listing_type: "Coach")}

# Create user harold
harold = User.create({
  first_name: "Harold",
  last_name: "Torres",
  gender: "M",
  country: countries[13],
  dob: "05/05/1991",
  bio: Faker::Lorem.paragraph(sentence_count: 30),
  username: "haroldtm55",
  email: "harold@example.com",
  password: "password",
  password_confirmation: "password"
})

# Create listing for harold
harold_listing = Listing.create({
  title: "I want to be your cybermate",
  listing_type: "Mate",
  description: Faker::Lorem.paragraph(sentence_count: 30),
  user_provider: harold
})

topics = Topic.all
5.times do
  # Pick a random topic without repetition and assign it to harold's listing, generate an available date in the future and the past
  random_topic = topics[rand(0..topics.count - 1)]
  harold_listing.topics << random_topic if harold_listing.topics.all? {|t| t != random_topic}
  random_available_date_future = AvailableDate.create(available_date: rand(2.months).seconds.from_now.to_datetime.change({hour:13}), listing: harold_listing)
  random_available_date_past = AvailableDate.create(available_date: rand(2.months).seconds.ago.to_datetime.change({hour:13}), listing: harold_listing)
end

# Create user siri
siri = User.create({
  first_name: "Siri",
  last_name: "Watasir",
  gender: "F",
  country: countries[13],
  dob: "29/11/1997",
  bio: Faker::Lorem.paragraph(sentence_count: 30),
  username: "chongnang",
  email: "siri@example.com",
  password: "password",
  password_confirmation: "password"
})

#Pick two of harold's available dates
rand_available_date_from_harold_listing_1 = harold_listing.available_dates_not_reserved[rand(0..harold_listing.available_dates_not_reserved.count - 1)].available_date
rand_available_date_from_harold_listing_2 = harold_listing.available_dates_not_reserved[rand(0..harold_listing.available_dates_not_reserved.count - 1)].available_date

#Send two messages between harold and siri
siri_to_harold_1 = Message.create(sender: siri, receiver: harold, listing:harold_listing, content: Faker::Lorem.paragraph(sentence_count: 15))
haroldto_siri_1 = Message.create(sender: harold, receiver: siri, listing:harold_listing, content: Faker::Lorem.paragraph(sentence_count: 15))
siri_to_harold_2 = Message.create(sender: siri, receiver: harold, content: Faker::Lorem.paragraph(sentence_count: 15))
harold_to_siri_2 = Message.create(sender: harold, receiver: siri, content: Faker::Lorem.paragraph(sentence_count: 15))

#Create two reservations for Siri and and assign each available date to be reserved
siri_reservation_1 = Reservation.create({
  listing: harold_listing,
  user_receiver: siri,
  status: "pending",
  reservation_date: rand_available_date_from_harold_listing_1
})

siri_reservation_2 = Reservation.create({
  listing: harold_listing,
  user_receiver: siri,
  status: "pending",
  reservation_date: rand_available_date_from_harold_listing_2
})

harold_listing.available_dates_not_reserved.where(available_date: rand_available_date_from_harold_listing_1).update(is_reserved: true)
harold_listing.available_dates_not_reserved.where(available_date: rand_available_date_from_harold_listing_2).update(is_reserved: true)

today = Date.today
#For Siri's reservations, if the date is before today, add a review to it and change the status to closed
siri.made_reservations.each do |reservation|
  if reservation.reservation_date < today
    review = Review.create(message: 'Good service', user:siri, reservation: reservation, rating: 4)
    reservation.update(status: "closed")
  end
end

#---------------------------#
#CREATION OF RANDOM USERS
#---------------------------#

gender = ['M', 'F', 'O']
def generate_rand_gender(iterator)
  if iterator % 2 == 0 && iterator % 6 != 0
    'F'
  elsif iterator % 6 == 0
    'O'
  else
    'M'
  end
end


#Create a given amount of users with random info
i=2
while i < 8 do
  User.create(
    first_name: i % 2 !=0 ? Faker::Name.male_first_name : Faker::Name.female_first_name,
    last_name: Faker::Name.last_name,
    gender: generate_rand_gender(i),
    bio: Faker::Lorem.paragraph(sentence_count: 30),
    country: countries[rand(0..countries.count - 1)],
    dob: rand(18.years..60.years).ago,
    username: "user" + "#{i+1}",
    email: Faker::Internet.email,
    password: "password",
    password_confirmation: "password"
  )
  i+=1
end


users = User.all


#Create a given amount of listings with random info and assign them to random users. Assign between 3 to 10 random topics, available dates in the future and past
i=0
while i < 32 do
  listing = Listing.create({
    title: Faker::Lorem.sentence,
    listing_type: "Mate",
    description: Faker::Lorem.paragraph(sentence_count: 30),
    user_provider: users[rand(0..users.count - 1)]
  })
  i+=1

  rand(3..10).times do
    random_topic = topics[rand(0..topics.count - 1)]
    listing.topics << random_topic if listing.topics.all? {|t| t != random_topic}
    random_available_date_future = AvailableDate.create(available_date: rand(2.months).seconds.from_now.to_datetime.change({hour:13}), listing: listing)
    random_available_date_past = AvailableDate.create(available_date: rand(2.months).seconds.ago.to_datetime.change({hour:13}), listing: listing)
  end
end

listings = Listing.all

# A given amount of times, pick a random listing and a random user receiver, pick a random available date...
i=0
while i < 65 do
  rand_listing = listings[rand(0..listings.count - 1)]
  rand_listing_user_provider = rand_listing.user_provider
  rand_user_receiver = users[rand(0..users.count - 1)]

  if rand_listing_user_provider == rand_user_receiver
    next
  end

  if rand_user_receiver != rand_listing_user_provider
    receiver_to_provider_1 = Message.create(sender: rand_user_receiver, receiver: rand_listing_user_provider, listing:rand_listing, content: Faker::Lorem.paragraph(sentence_count: 15))
    provider_to_receiver_1 = Message.create(sender: rand_listing_user_provider, receiver: rand_user_receiver, listing:rand_listing, content: Faker::Lorem.paragraph(sentence_count: 15))
    receiver_to_provider_2 = Message.create(sender: rand_user_receiver, receiver: rand_listing_user_provider, content: Faker::Lorem.paragraph(sentence_count: 15))
    provider_to_receiver_2 = Message.create(sender: rand_listing_user_provider, receiver: rand_user_receiver, content: Faker::Lorem.paragraph(sentence_count: 15))
  end

  if rand_listing.available_dates_not_reserved.count == 0
    next
  end
  
  rand_available_date_from_rand_listing = rand_listing.available_dates_not_reserved[rand(0..rand_listing.available_dates_not_reserved.count - 1)].available_date
  reservation = Reservation.create({
    listing: rand_listing,
    user_receiver: rand_user_receiver,
    status: "pending",
    reservation_date: rand_available_date_from_rand_listing,
  })
  rand_listing.available_dates_not_reserved.where(available_date: rand_available_date_from_rand_listing).update(is_reserved: true)

  if i%2==0 || i%3==0 && reservation.reservation_date < today
    i%2==0 && review = Review.create(message: Faker::Lorem.paragraph(sentence_count: 2), user:rand_user_receiver, reservation: reservation, rating: rand(1..5))
    reservation.update(status: "closed")
  end
  i+=1
end

Reservation.all.filter{|r| r.reservation_date < today && r.status=="pending"}.each{|r| r.update(status: "expired")}