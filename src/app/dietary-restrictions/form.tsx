'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { valibotResolver } from '@hookform/resolvers/valibot'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { schema } from './schema'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import {
  dairyAndAlternatives,
  fruits,
  grainsAndLegumes,
  meatsAndSeafood,
  miscellaneous,
  spicesAndHerbs,
  vegetables,
} from '@/constants'
import {
  Boxes,
  Carrot,
  Check,
  Cherry,
  ChevronsUpDown,
  Ham,
  Leaf,
  Milk,
  WheatIcon,
} from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { AutoComplete, type Option } from '@/components/ui/autocomplete'

const icons = {
  vegetables: <Carrot />,
  fruits: <Cherry />,
  meatsAndSeafood: <Ham />,
  dairyAndAlternatives: <Milk />,
  spicesAndHerbs: <Leaf />,
  grainsAndLegumes: <WheatIcon />,
  miscellaneous: <Boxes />,
}

type Category = keyof typeof icons

const filterItems = (items: string[], query: string) =>
  items.filter(item => item.toLowerCase().includes(query.toLowerCase()))

const formatCategoryName = (category: string) => {
  return category
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
}

export function DietaryRestrictionsForm() {
  const commandRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<Option>()
  const [suggestions, setSuggestions] = useState<{ [key: string]: string[] }>({
    vegetables: [],
    fruits: [],
    meatsAndSeafood: [],
    dairyAndAlternatives: [],
    spicesAndHerbs: [],
    grainsAndLegumes: [],
    miscellaneous: [],
  })

  const frameworks = [
    {
      value: 'next.js',
      label: 'Next.js',
    },
    {
      value: 'sveltekit',
      label: 'SvelteKit',
    },
    {
      value: 'nuxt.js',
      label: 'Nuxt.js',
    },
    {
      value: 'remix',
      label: 'Remix',
    },
    {
      value: 'astro',
      label: 'Astro',
    },
  ]

  const handleSearch = useCallback(() => {
    if (!input.trim()) {
      setSuggestions({
        vegetables: [],
        fruits: [],
        meatsAndSeafood: [],
        dairyAndAlternatives: [],
        spicesAndHerbs: [],
        grainsAndLegumes: [],
        miscellaneous: [],
      })
      return
    }

    setSuggestions({
      vegetables: filterItems(vegetables, input),
      fruits: filterItems(fruits, input),
      meatsAndSeafood: filterItems(meatsAndSeafood, input),
      dairyAndAlternatives: filterItems(dairyAndAlternatives, input),
      spicesAndHerbs: filterItems(spicesAndHerbs, input),
      grainsAndLegumes: filterItems(grainsAndLegumes, input),
      miscellaneous: filterItems(miscellaneous, input),
    })
  }, [input])

  const debounceRequest = useCallback(debounce(handleSearch, 300), [
    handleSearch,
  ])

  useEffect(() => {
    debounceRequest()
  }, [input])

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Dietary Restrictions
          </CardTitle>
          <CardDescription>
            Please insert what you don't eat or you're allergic to
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <AutoComplete
            options={frameworks}
            emptyMessage="No resulsts."
            placeholder="Find something"
            onValueChange={setValue}
            value={value}
          />
          {/* <Command className="rounded-lg border shadow-md" value={input}>
            <CommandInput
              placeholder="Type a command or search..."
              value={input}
              onValueChange={txt => {
                setInput(txt)
              }}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              {Object.keys(suggestions).map((category, index) => {
                const items = suggestions[category as keyof typeof suggestions]
                if (items.length > 0) {
                  return (
                    // <Fragment key={category}>
                    <CommandGroup
                      key={category}
                      heading={
                        <span className="flex items-center gap-2 text-semibold">
                          {icons[category as Category]}
                          <span>{formatCategoryName(category)}</span>
                        </span>
                      }
                    >
                      {items.map(item => (
                        <CommandItem
                          key={item}
                          className="hover:bg-primary hover:text-primary-foreground"
                          onSelect={txt => alert(txt)}
                        >
                          {item}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    // {index < Object.keys(suggestions).length - 1 && (
                    //   // <CommandSeparator /> // not rendering !!
                    //   <hr />
                    // )}
                    // </Fragment>
                  )
                }
                return null
              })}
            </CommandList>
          </Command> */}
        </CardContent>
        <CardFooter className="grid gap-2"></CardFooter>
      </Card>
    </div>
  )
}
