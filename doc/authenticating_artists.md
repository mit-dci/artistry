# Authenticating artists

In order to implement payments, we need to create a mechanism that would allow the users to send money to specific artists. Song metadata typically does not include payment information, so we need to find a way for the users to obtain that information.

## Possible approaches

1. The Brave approach
    - [Brave](https://www.brave.com/publishers.html) does for websites more or less what Artistry does for music
    - AFAICT, Brave holds custody of the yet-unclaimed money, which we don't want the OMI to do
2. Known (artist → Bitcoin address) mappings.
    - if the user knows the artist's Bitcoin address, they can send them money directly
    - problems: **identification** (what, exactly, is the input to this mapping? just the band name doesn't work, because there are real-world conflicts) and **verification** (how can a user be sure that the mapping they got from OMI (or elsewhere) is legitimate?)
3. Bitcoin scripts
    - if we don't know the artist's Bitcoin address, but can encode the concept of "being artist X" as something a Bitcoin script can verify, we can create transactions that can only be claimed by the artist without knowing their address in advance
    - one possible way of doing this: the script requires a *certificate*, signed by a trusted party (OMI, the artist's label, ...), that proves that the recipient's address belongs to a given artist
    - this is very similar to approach #2 above, but lets us create transactions without relying on some way of acquiring the mappings, potentially reducing centralization. **identification** and **verification** are still problems.

## Problem: identification

One problem is figuring out what “pay artist X” even means. When I say “I want to pay Taylor Swift”, we have a general concept of the entity I'm trying to pay, although it's still a little bit complicated by the fact that Taylor Swift has a record label, a producer, etc. But if I say “I want to pay 3”, I could mean either [the British band from the 80s](https://en.wikipedia.org/wiki/3_(1980s_band)) or [the New York band from the 90s](https://en.wikipedia.org/wiki/3_(American_band)), or maybe my music is tagged poorly and I actually mean [the DC punk rock band Three](https://en.wikipedia.org/wiki/Three_(band)).

More generally, the band name alone does not give us enough information about *what would count as sufficient proof of this band's identity*. Some bands have contracts with major labels, others don't; some bands have verified Twitter accounts, others don't, etc, and none of this can be determined from just the name alone.

Essentially, we want to find a set of information about an artist that is both easy to reliably extract from a song and its associated metadata, and also complete enough that it identifies the artist uniquely.

Some identifiers that bands tend to have include:

- domain names
- verified Facebook/Twitter pages
- Bandcamp pages

## Problem: verification

OMI should not be able to just say "Taylor Swift's wallet is 19fG...aP", because the users don't really have any reason to believe us. Likewise, if we're letting OMI partners attest to a band's identity, Sony has no business attesting to the identity of an indie Estonian band that has never signed a contract with Sony.

Luckily, this problem is very similar to other, more or less solved, problems:

### Prior art: Certificate Transparency

In TLS/SSL, Certificate Authorities (CAs) issue certificates that attest that a given RSA public key belongs to the owner of a given domain name. This is extremely similar to our idea of issuing certificates that attest that a given Bitcoin wallet belongs to a given artist.

However, domain name owners want to ensure that any random CA cannot just decide to issue a certificate for their domain. This is resolved with [Certificate Transparency](https://en.wikipedia.org/wiki/Certificate_Transparency) --- essentially, every CA maintains a public, append-only log of all certificates it has ever issued, and certificates are only accepted as valid if they're found in one of these logs. This lets domain name owners, as well as 3rd parties, monitor the CAs' actions and detect missisuance.

A similar approach could be used here, where everyone could see that, e.g., Sony is only signing certificates for bands known to have a contract with Sony.

### Prior art: keybase.io

[Keybase.io](https://keybase.io) lets users associate their identities on multiple social networks by publicly posting cryptographic proof of identity. This can be used with, e.g., Bandcamp pages or verified Twitter pages. However, the question of determining what the artist's Bandcamp page/Twitter handle is remains open.

### Prior art: sipb-pgpsign

Somewhere between CT and keybase.io is [sipb-pgpsign](https://github.com/andres-erbsen/sipb-pgpsign), a project at MIT's SIPB that was intended as a kind of a certificate authority (to be used by MIT students to prove their own identity) that publicly logged not only the certificates it issued, but also the information supplied by the user to prove their identity (in this case, a signature by [MIT's CA](https://ca.mit.edu), so the purpose of the project was essentially just to convert TLS certificated issued by MIT into PGP signatures).

Similarly, OMI partners attesting to an artist's identity should log information about their relationship to the artist --- whether they're verifying them because a real contract exists (perhaps even providing a copy of whatever parts of it can be made public?) or, e.g., because they've checked their twitter account (providing a link to the account and the verification tweet in that case).
