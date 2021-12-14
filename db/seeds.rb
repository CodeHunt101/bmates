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
  mate: true,
  password: "password",
  password_confirmation: "password"
})

harold_listing = Listing.create({
  title: "I want to be your cybermate",
  description: "bleh bleh",
  mate: harold
})

siri = User.create({
  first_name: "Siri",
  last_name: "Watasir",
  gender: "F",
  bio: "blah blah blah",
  username: "chongnang",
  email: "siri@example.com",
  mate: false,
  password: "password",
  password_confirmation: "password"
})

mate = [true, false]
gender = ['M', 'F']

i=0
while i<100 do
  User.create(
    first_name: i<=50 ? Faker::Name.male_first_name : Faker::Name.female_first_name,
    last_name: Faker::Name.last_name,
    gender: i <= 50 ? 'M' : 'F',
    bio: "blah blah blah",
    username: "user" + "#{i+1}",
    email: Faker::Internet.email,
    mate: mate[rand(0..1)],
    password: "password",
    password_confirmation: "password"
  )
  i+=1
end

siri_reservation = Reservation.create({
  listing: harold_listing,
  member: siri,
  status: "pending",
  checkin: '2022-02-02 01:00:00',
  checkout: '2022-02-02 02:00:00' 
})

mates = User.select{|u| u.mate}

mates.each do |mate|
  Listing.create({
    title: Faker::Lorem.sentence,
    description: Faker::Lorem.paragraph,
    mate: mate
  })
end

members = User.select{|u| !u.mate}

members.each do |member|
  rand_checkin = rand(2.years).seconds.ago
  rand_checkout = rand_checkin + 3600
  Reservation.create({
    listing: Listing.all[rand(0..Listing.all.count - 1)],
    member: member,
    status: "pending",
    checkin: rand_checkin,
    checkout: rand_checkout 
  })
end