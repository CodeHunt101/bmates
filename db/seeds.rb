# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

harold = User.create({
  first_name: "Harold",
  last_name: "Torres",
  gender: "M",
  bio: "blah blah blah",
  username: "haroldtm55",
  email: "harold@example.com",
  password: "password",
  password_confirmation: "password"
})

harold_listing = Listing.create({
  title: "I want to be your cybermate",
  description: "bleh bleh",
  user_provider: harold
})

siri = User.create({
  first_name: "Siri",
  last_name: "Watasir",
  gender: "F",
  bio: "blah blah blah",
  username: "chongnang",
  email: "siri@example.com",
  password: "password",
  password_confirmation: "password"
})
gender = ['M', 'F']

i=2
while i<100 do
  User.create(
    first_name: i % 2 !=0 ? Faker::Name.male_first_name : Faker::Name.female_first_name,
    last_name: Faker::Name.last_name,
    gender: i % 2 != 0 ? 'M' : 'F',
    bio: "blah blah blah",
    username: "user" + "#{i+1}",
    email: Faker::Internet.email,
    password: "password",
    password_confirmation: "password"
  )
  i+=1
end

siri_reservation = Reservation.create({
  listing: harold_listing,
  user_receiver: siri,
  status: "pending",
  checkin: '2022-02-02 01:00:00',
  checkout: '2022-02-02 02:00:00' 
})

users = User.all

i=0
while i < 100 do
  Listing.create({
    title: Faker::Lorem.sentence,
    description: Faker::Lorem.paragraph,
    user_provider: User.all[rand(0..User.all.count - 1)]
  })
  i+=1
end

i=0
while i < 100 do
  rand_checkin = rand(2.years).seconds.ago
  rand_checkout = rand_checkin + 3600
  Reservation.create({
    listing: Listing.all[rand(0..Listing.all.count - 1)],
    user_receiver: User.all[rand(0..User.all.count - 1)],
    status: "pending",
    checkin: rand_checkin,
    checkout: rand_checkout 
  })
  i+=1
end