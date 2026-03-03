<h1 id="b64">Base64</h1>

&nbsp;

This topic requires the following prerequisites:
- ASCII
- Logical Operations

&nbsp;

### What is Base64

Base64 is similar to ASCII, but instead of using 7-bit (standard ASCII) or 8-bit (extended ASCII) blocks, it operates on **6-bit** chunks.

So Base64 uses **64 characters** because $2^6 = 64$.

For example, if we want to encode the word `"hello"` in Base64, we first write each character as 8-bit bytes:

h: 0 1 1 0 1 0 0 0  
e: 0 1 1 0 0 1 0 1  
l: 0 1 1 0 1 1 0 0  
l: 0 1 1 0 1 1 0 0  
o: 0 1 1 0 1 1 1 1  

To convert this to Base64, we group all the bits into 6-bit chunks:

```                                                                                                                           
      ┌──────┐            ┌──────┐            ┌──────┐            ┌──────┐            ┌──────┐           
┌─────┤8-bits├─────┬──────┼8-bits├─────┬──────┤8-bits├─────┬──────┤8-bits├─────┬──────┤8-bits├─────┐     
│     └──────┘     │      └──────┘     │      └──────┘     │      └──────┘     │      └──────┘     │     
├────────────┬─────┼─────────┬─────────┼─────┬─────────────┼─────────────┬─────┼─────────┬─────────┼────┐
│0 1 1 0 1 0 │ 0 0 | 0 1 1 0 │ 0 1 0 1 | 0 1 │ 1 0 1 0 0 0 │ 0 1 1 0 1 0 │ 0 0 | 0 1 1 0 │ 1 0 1 1 | 0 0│
├────────────┼───────────────┼───────────────┼─────────────┼─────────────┼───────────────┼──────────────┤
│  ┌──────┐  │    ┌──────┐   │   ┌──────┐    │   ┌──────┐  │   ┌──────┐  │    ┌──────┐   │   ┌──────┐   │
└──┤6-bits├──┴────┤6-bits├───┴───┤6-bits├────┴───┤6-bits├──┴───┤6-bits├──┴────┤6-bits├───┴───┤6-bits├───┘
   └──────┘       └──────┘       └──────┘        └──────┘      └──────┘       └──────┘       └──────┘                                                                                                            
```