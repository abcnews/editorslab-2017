What is the problem we're trying to solve?
==========================================

KathyReid: With respect, this isn't the problem you're trying to solve, this is the 'how'. The 'what' is much bigger and would, IMHO, make a stronger pitch. You're not just securing comms b/w journalists and sources, you're enabling the truth to be told. Think of the analogy - "I'm not a brick layer, I'm helping to build a cathedral". Pitch higher. 

"In a time of universal deceit, telling the truth is a revolutionary act" -- George Orwell

But that act comes with real risks. 

People don't know how to securely contact journalists. Equally, journalists—for the most part—don't know how to accept secure communications.

*We want to make the first point of contact easy and safe.*

Secure communication is hard. It's getting easier all the time with the advent of systems like Signal and WhatsApp, but there are still big barriers to people who want simply to start a conversation.

We'd like to give people an option for starting conversations which is:

-	Convenient
-	Relatively secure
-	Available right when a reader realises they might have something to share

In doing so, we're enabling truths to be uncovered and told. 

Who is our target audience?
===========================

1.	Anybody with something sensitive to share.
2.	Journalists wanting to engage with their audience on more sensitive topics.

Any member of the public who wants to communicate sensitive information privately to a specific journalist will be able to do so with our product.

We want to lower the barriers of entry for people who would otherwise not contact a journalist due to anxiety around the security of their communication or the sensitivity of the subject or illiteracy around how to do it.

THIS IDEA ROCKS MY WORLD. SERIOUSLY GODDAM ROCKS MY WORLD. 

What are we going to prototype
==============================

We're going to prototype an embeddable form which journalists and organisations can put right in their stories, personal websites, etc.

As well as that there will be a website where journalists can register to receive messages. Once signed up it will provide an embed code.

One of the key messages anyone working with cryptography should internalise is: **never do your own cryptography**. With this in mind, our product will do the minimum amount of cryptography possible—and we certainly won't be writing any of the cryptographic algorithms. To do the heavy lifting we'll leverage off the high quality work of others and integrate with [keybase.io](https://keybase.io).

HELL YES. Also, I'm @kathyreid on keybase if you need a guinea pig / test subject. 

Journalists who want to accept encrypted messages will need a keybase profile. Keybase will handle the management of public and private keys.

The most we will ever do is fetch your public key from your keybase profile.

So, when people use this product our servers will never even see the message. The encryption happens right in the browser so there's no chance that anyone but the intended recipient (who controls the private key) can read the message.
