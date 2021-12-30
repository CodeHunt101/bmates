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

mate_topics.map {|t| Topic.create(name: t, listing_type: "Mate")}
# coach_topics.map {|t| Topic.create(name: t, listing_type: "Coach")}

harold = User.create({
  first_name: "Harold",
  last_name: "Torres",
  gender: "M",
  bio: Faker::Lorem.paragraph(sentence_count: 5),
  username: "haroldtm55",
  email: "harold@example.com",
  password: "password",
  password_confirmation: "password"
})

harold_listing = Listing.create({
  title: "I want to be your cybermate",
  listing_type: "Mate",
  description: Faker::Lorem.paragraph(sentence_count: 5),
  user_provider: harold
})

5.times do
  random_topic = Topic.all[rand(0..Topic.all.count - 1)]
  harold_listing.topics << random_topic if harold_listing.topics.all? {|t| t != random_topic}
  random_available_date_future = AvailableDate.create(available_date: rand(2.months).seconds.from_now.to_datetime.change({hour:13}), listing: harold_listing)
  random_available_date_past = AvailableDate.create(available_date: rand(2.months).seconds.ago.to_datetime.change({hour:13}), listing: harold_listing)
end


siri = User.create({
  first_name: "Siri",
  last_name: "Watasir",
  gender: "F",
  bio: Faker::Lorem.paragraph(sentence_count: 5),
  username: "chongnang",
  email: "siri@example.com",
  password: "password",
  password_confirmation: "password"
})

rand_available_date_from_harold_listing_1 = harold_listing.available_dates_not_reserved[rand(0..harold_listing.available_dates_not_reserved.count - 1)].available_date
rand_available_date_from_harold_listing_2 = harold_listing.available_dates_not_reserved[rand(0..harold_listing.available_dates_not_reserved.count - 1)].available_date

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

siri.made_reservations.each do |reservation|
  if reservation.reservation_date < Date.today
    review = Review.create(message: 'excellent service', user:siri, reservation: reservation, rating: 5)
    reservation.update(status: "closed")
  end
end

gender = ['M', 'F']

i=2
while i < 50 do
  User.create(
    first_name: i % 2 !=0 ? Faker::Name.male_first_name : Faker::Name.female_first_name,
    last_name: Faker::Name.last_name,
    gender: i % 2 != 0 ? 'M' : 'F',
    bio: Faker::Lorem.paragraph(sentence_count: 5),
    username: "user" + "#{i+1}",
    email: Faker::Internet.email,
    password: "password",
    password_confirmation: "password"
  )
  i+=1
end

users = User.all

i=0
while i < 50 do
  listing = Listing.create({
    title: Faker::Lorem.sentence,
    listing_type: "Mate",
    description: Faker::Lorem.paragraph(sentence_count: 5),
    user_provider: User.all[rand(0..User.all.count - 1)]
  })
  i+=1

  rand(3..10).times do
    random_topic = Topic.all[rand(0..Topic.all.count - 1)]
    listing.topics << random_topic if listing.topics.all? {|t| t != random_topic}
    random_available_date_future = AvailableDate.create(available_date: rand(2.months).seconds.from_now.to_datetime.change({hour:13}), listing: listing)
    random_available_date_past = AvailableDate.create(available_date: rand(2.months).seconds.ago.to_datetime.change({hour:13}), listing: listing)
  end
end

i=0
while i < 101 do
  rand_listing = Listing.all[rand(0..Listing.all.count - 1)]
  rand_user_receiver = User.all[rand(0..User.all.count - 1)]

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

  if i%2==0 && reservation.reservation_date < Date.today
    review = Review.create(message: Faker::Lorem.paragraph(sentence_count: 2), user:rand_user_receiver, reservation: reservation, rating: rand(0..5))
    reservation.update(status: "closed")
  end
  i+=1
end